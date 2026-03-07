---
title: Drag and Drop
description: An interaction pattern for moving elements by dragging them to new positions, implemented via HTML5 API or JavaScript libraries
tags: ["web-dev", "javascript", "html", "frontend"]

---

Drag and drop is a UI interaction pattern that allows users to select an element, drag it across a surface, and release it in a new location to trigger an action. Common uses include reordering lists, uploading files, building visual editors, and organizing kanban boards.

## HTML5 Drag and Drop API

Browsers provide a native drag-and-drop API through [[html|HTML]]. Any element can be made draggable by setting the `draggable` attribute to `"true"`. Drop targets are configured by listening to drag-related events and calling `event.preventDefault()` to allow drops.

```html
<div draggable="true" id="item">Drag me</div>
<div id="target">Drop here</div>
```

### The DataTransfer Object

During a drag operation, data is carried via `event.dataTransfer`. This object lets you set and retrieve arbitrary string data keyed by a MIME type or custom string.

```js
element.addEventListener("dragstart", (event) => {
  event.dataTransfer.setData("text/plain", event.target.id)
})
```

On the drop target, the stored value is retrieved:

```js
target.addEventListener("drop", (event) => {
  event.preventDefault()
  const id = event.dataTransfer.getData("text/plain")
  const dragged = document.getElementById(id)
  target.appendChild(dragged)
})
```

### Key Events

| Event | When It Fires |
|---|---|
| `dragstart` | The user begins dragging an element |
| `dragover` | The dragged element is over a valid drop target (must call `preventDefault()`) |
| `dragleave` | The dragged element leaves a drop target |
| `drop` | The element is released over a drop target |
| `dragend` | The drag operation ends (whether or not a drop occurred) |

## Accessibility Concerns

The native HTML5 Drag and Drop API has poor keyboard accessibility by default. Users who cannot use a mouse (motor disabilities, keyboard-only users, switch access users) cannot interact with drag operations unless explicit keyboard alternatives are provided.

Best practices:
- Provide keyboard shortcuts or button-based controls for every drag interaction
- Use `aria-grabbed` and `aria-dropeffect` attributes (though these are deprecated in ARIA 1.1; prefer live region announcements)
- Test with a screen reader to confirm that state changes are announced

## JavaScript Library Alternatives

When the native API's limitations become a problem (complex reordering, touch support, framework integration), purpose-built libraries are a better choice.

**SortableJS**: Lightweight, touch-friendly library that works with any framework or with plain HTML. Well-suited for sortable lists and grids with minimal configuration.

**interact.js**: More comprehensive than SortableJS. Handles drag-and-drop, resize, and gesture interactions. Framework-agnostic.

**dnd-kit**: A modern, accessibility-aware drag-and-drop toolkit designed specifically for React. Provides fine-grained control over sensors, collision detection, and announcements.

The [[sortable-js|SortableJS]] library is a common starting point for most drag-and-drop needs outside of React projects, due to its small size and straightforward API.

## Related Topics

- [[javascript|JavaScript]]
- [[html|HTML]]
- [[sortable-js|SortableJS]]
