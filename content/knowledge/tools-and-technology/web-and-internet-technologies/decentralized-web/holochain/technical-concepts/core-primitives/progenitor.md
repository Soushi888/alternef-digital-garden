#holochain/concepts 

The Progenitor pattern in [[knowledge/tools-and-technology/web-and-internet-technologies/decentralized-web/holochain/index|Holochain]] hApp development refers to a design strategy used to bootstrap and manage administrative privileges within a Holochain application. This pattern is particularly useful for initializing new instances of a hApp, especially when setting up the initial state or assigning default roles and permissions.

In the context of Holochain, a hApp (holochain application) is a decentralized application built on the Holochain framework. Each hApp is defined by its DNA (Distributed Network Architecture), which specifies the rules and logic for how data is stored, shared, and processed across the network. The Progenitor pattern plays a crucial role in managing the early stages of a hApp's lifecycle, especially concerning administrative control and setup.

The Progenitor pattern works by associating a unique [[Agent|agent]] key with the initial setup or administration of a hApp. This agent key acts as a special identifier that grants elevated privileges, similar to an administrator account in traditional software systems. When deploying a new instance of a hApp, the Progenitor pattern ensures that operations requiring administrative access are securely handled by this designated agent key.

For example, in the H-Wiki project mentioned in the sources, the Progenitor pattern is used to give admin access to a particular agent key during the initialization phase. This allows the initial administrator to set up the wiki, define roles, and manage content before others join the hApp. The use of the Progenitor pattern simplifies the deployment process and ensures that the hApp starts with a secure and controlled environment.

In practice, implementing the Progenitor pattern involves specifying the agent key in the DNA configuration of the hApp. This configuration is then used when starting the hApp, ensuring that the operations performed under the Progenitor's authority are correctly authenticated and authorized. This pattern enhances security and manageability, making it a valuable tool in the development of robust and scalable Holochain applications.

Overall, the Progenitor pattern in Holochain hApp development provides a structured and secure way to manage the initial setup and administrative aspects of decentralized applications, facilitating easier deployment and management of hApps within the Holochain ecosystem.

## Example

`DnaProperties` come from the example in [[DNA properties#Implementation example|DNA properties]] that is a `progenitor_pub_key`.

``` rust
/// Checks if the current agent is the progenitor of the DNA properties.
///
/// Compares the progenitor's public key against the current agent's initial public key.
///
/// # Returns
///
/// * `ExternResult<bool>` - Boolean indicating if the current agent is the progenitor.
pub fn check_if_progenitor() -> ExternResult<bool> {
    let progenitor_pubkey = DnaProperties::get_progenitor_pubkey()?;

    Ok(progenitor_pubkey == agent_info()?.agent_initial_pubkey)
}

```
