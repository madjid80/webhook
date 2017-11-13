var request = require('postman-request');
 
class Statuses{
  constructor(status_url, name , desc){
    this.option = {
      url:status_url, 
      method: 'POST',
      body:{
        "state": "pending",
        "target_url": "https://example.com/build/status",
        "description": desc,
        "context": "digikala-continuous-integration/"+name
      },
      headers:{
        'Authorization':'token de50eace663cc1950e0b9330f33928dfa955c874',
        'Content-Type': 'application/json', 
        'User-Agent':'digikala-continoues-server'
      },
      json: true
    }
  }
  pending(){
    this.option.body["state"] = "pending"
    this.sendStatus()
  }
  success(){
    this.option.body["state"] = "success"
    this.sendStatus()
  }
  failed(){
    this.option.body["state"]= "failed"
    this.sendStatus()
  }
  sendStatus(){
    request(this.option, (err, res, body)=>{
      console.log(">>> statuses sent "+err)
    })
  }
}
module.exports = Statuses
