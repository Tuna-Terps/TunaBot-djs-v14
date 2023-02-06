import { Event } from "../classes/Event";
import { client } from ".."

export default new Event("ready", () => {
    console.log(`${client?.user.tag} is now online!`);
    client.user.setActivity()
});