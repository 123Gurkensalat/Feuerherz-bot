import IClient from "../../ts/interfaces/IClient"

function setActivity(client: IClient){
    client.user?.setActivity({
        name: 'AFK Journey'
    })
}

export default setActivity;