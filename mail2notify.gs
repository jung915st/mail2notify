function getGmail() {
    //const query = "from:(jung@localdomain) subject:hosts_ok_2021 label:idp-status";
    const query = "from:(jung@localdomain) subject:hosts_down_2021 label:idp-status";
    let threads = GmailApp.search(query);

    let label = GmailApp.getUserLabelByName("done");
    if (!label) {label = GmailApp.createLabel("done")}

    let message = [];

    threads.forEach(thread => {
        message.push(thread.getMessages()[0].getBody());
        label.addToThread(thread);
    });
    console.log(message);
    return message;
}

function parseEmail(message){
//var message = 'oidc.tanet.edu.tw is ok,\r\noauth.km.edu.tw is ok,\r\nphc.sso.edu.tw is ok,\r\nmatsu.sso.edu.tw is ok,\r\nttct.sso.edu.tw is ok,\r\nhlc.sso.edu.tw is ok,\r\nilc.sso.edu.tw is ok,\r\nptc.sso.edu.tw is ok,\r\nkh.sso.edu.tw is ok,\r\nopenid.tn.edu.tw is ok,\r\nopenid.cy.edu.tw is ok,\r\ncyc.sso.edu.tw is ok,\r\nylc.sso.edu.tw is ok,\r\nchc.sso.edu.tw is ok,\r\nntct.sso.edu.tw is ok,\r\nmlc.sso.edu.tw is ok,\r\nhc.sso.edu.tw is ok,\r\nhcc.sso.edu.tw is ok,\r\ntyc.sso.edu.tw is ok,\r\nntpc.sso.edu.tw is ok,\r\ntp.sso.edu.tw is ok,\r\nkl.sso.edu.tw is ok,\r\nmoe.sso.edu.tw is ok,\r\n';
    
    //var messages = message.splice(index,1,item);
    let length = message.length;
    let parsed = [];
    for (var i = 0; i < length; i++) {
      var sms = message[i].replace(/\r\n/g,"").split(",");
      parsed.push(sms);
    }
    //let parsed = messages.replace(/\r\n/g,"").split(",");


    //let result = [0,1,2,3,4,6].map(index => parsed[index]);
    console.log(parsed);

    return parsed;
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

function sendMessage() {
  var linetoken = "ra6NPqGxNlxftH8X2WwSbf";
  var mailbody = parseEmail(getGmail());
  var message= JSON.stringify(mailbody);
  //mailbody.join(",");
  if( Object.entries(message).length !== 0){ //not working
  LineNotify(message,linetoken);
  }
  else {console.log(message);}
  
}


function LineNotify(message,linetoken) {
  var options = {
    "method":"post",
    "payload":{"message":message},
    "headers":{"Authorization":"Bearer "+ linetoken}
  };
  UrlFetchApp.fetch("https://notify-api.line.me/api/notify",options);

}
