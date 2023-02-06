import { Command } from "../../classes/Command"
import { client } from "../.."

export default new Command({
    name: "ping",
    description: "replies with bot ping",
    run: async ({ interaction }) =>  {
        interaction.followUp(`Response time: ${Date.now() - interaction.createdTimestamp}ms \n-----\nAPI Latency: ${Math.round(client.ws.ping)}ms`)
        .then(() =>{
            setTimeout(()=> {
                interaction.deleteReply()
            }, 10000)
        })
    }
})