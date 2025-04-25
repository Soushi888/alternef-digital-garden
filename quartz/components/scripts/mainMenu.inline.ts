import * as E from "effect/Effect"
import * as O from "effect/Option"
import {Scope} from "effect/Scope"
import { pipe } from "effect/Function"

// --- DOM Access Effects ---

const getElementById = (id: string): E.Effect<O.Option<HTMLElement>> =>
  E.sync(() => O.fromNullable(document.getElementById(id)))

const querySelector = (selector: string): E.Effect<O.Option<Element>> =>
  E.sync(() => O.fromNullable(document.querySelector(selector)))

const getToggleButton = (): E.Effect<O.Option<HTMLElement>> =>
  getElementById("mobile-menu-toggle")

const getBodySelector = (): E.Effect<O.Option<Element>> =>
  querySelector("#quartz-body") // Assuming #quartz-body is the intended selector

const getMenuNav = (): E.Effect<O.Option<Element>> =>
  querySelector(".main-menu-nav")

// --- DOM Manipulation Effects ---

const toggleClass = (element: Element, className: string): E.Effect<void> =>
  E.sync(() => element.classList.toggle(className))

const removeClass = (element: Element, className: string): E.Effect<void> =>
  E.sync(() => element.classList.remove(className))

const setBodyOverflow = (value: string): E.Effect<void> =>
  E.sync(() => { document.body.style.overflow = value })

const elementContains = (parent: Element, child: EventTarget | null): E.Effect<boolean> =>
  E.sync(() => parent.contains(child as Node | null))

const getWindowInnerWidth = (): E.Effect<number> =>
  E.sync(() => window.innerWidth)

// --- Core Logic Effects ---

const toggleSidebarEffect = (toggleButton: HTMLElement): E.Effect<void> =>
  E.gen(function*(_) {
    yield* _(toggleClass(toggleButton, "active"))
    const isActive = toggleButton.classList.contains("active")

    const bodySelectorOpt = yield* _(getBodySelector())

    yield* _(O.match(bodySelectorOpt, {
      onNone: () => E.void,
      onSome: (body) => toggleClass(body, "lock-scroll")
    }))

    yield* _(setBodyOverflow(isActive ? "hidden" : ""))
  }).pipe(
    E.catchAllCause(cause => E.logError(cause)),
    E.ignore
  )

const resetSidebarState = (): E.Effect<void> =>
  E.gen(function*(_) {
    const bodySelectorOpt = yield* _(getBodySelector())
    const toggleButtonOpt = yield* _(getToggleButton())

    yield* _(O.match(bodySelectorOpt, {
      onNone: () => E.void,
      onSome: (body) => removeClass(body, "lock-scroll")
    }))

    yield* _(O.match(toggleButtonOpt, {
      onNone: () => E.void,
      onSome: (button) => removeClass(button, "active")
    }))

    yield* _(setBodyOverflow(""))
  }).pipe(
    E.catchAllCause(cause => E.logError(cause)),
    E.ignore
  )


// --- Event Listener Resource Management ---

const manageEventListener = <T extends EventTarget, K extends string>(
  target: T,
  type: K,
  listener: (ev: Event) => E.Effect<void>, 
  options?: boolean | AddEventListenerOptions
): E.Effect<void, never, Scope> =>
  E.acquireRelease(
    E.sync(() => {
      const handler = (ev: Event) => {
        E.runFork(pipe(
          listener(ev),
          E.catchAllCause(cause => E.logError(cause)),
          E.ignore
        ))
      }
      target.addEventListener(type, handler, options)
      return handler 
    }),
    (handler) => E.sync(() => {
      if (typeof (target as any).removeEventListener === 'function') {
         (target as any).removeEventListener(type, handler, options)
      }
    })
  ).pipe(
     E.flatMap(() => E.void),
     E.catchAllCause(cause => E.logWarning(cause)),
     E.ignore
   )


// --- Main Program ---

const program = E.gen(function* (_) {
  const toggleButtonOpt = yield* _(getToggleButton())

  yield* _(O.match(toggleButtonOpt, {
      onNone: () => E.logInfo("Mobile menu toggle button not found"),
      onSome: (button) =>
        manageEventListener(button, "click", () => toggleSidebarEffect(button))
    }))

  yield* _(manageEventListener(document as unknown as EventTarget, "click", (e) => E.gen(function* (_) {
      const menuNavOpt = yield* _(getMenuNav())
      const toggleButtonOpt = yield* _(getToggleButton())

      if (O.isSome(menuNavOpt) && O.isSome(toggleButtonOpt)) {
        const menuNav = menuNavOpt.value
        const toggleButton = toggleButtonOpt.value

        if (toggleButton.classList.contains("active")) {
          const isMenuClick = yield* _(elementContains(menuNav, e.target))
          const isToggleClick = yield* _(elementContains(toggleButton, e.target))

          if (!isMenuClick && !isToggleClick) {
            yield* _(toggleSidebarEffect(toggleButton))
          }
        }
      }
  }), { passive: true }))


  yield* _(manageEventListener(document as unknown as EventTarget, "nav", () => resetSidebarState()))

  yield* _(manageEventListener(window, "resize", () => E.gen(function*(_) {
    const width = yield* _(getWindowInnerWidth())
    if (width > 768) {
       yield* _(resetSidebarState())
    }
  })))

  yield* _(E.logInfo("Mobile menu sidebar effects initialized"))
})


// --- Execution ---

const main = E.scoped(program)

E.runFork(main)
