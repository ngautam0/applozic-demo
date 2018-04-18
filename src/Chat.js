import React, { Component } from 'react';
import './App.css';

class Chat extends Component {
  constructor(props){
    super(props);
    this.state = {userId : window.localStorage.getItem("usernameforapplozicchat")};
    console.log(this.state.userId);


  }

  componentWillMount(){
    var applozicApplicationKey = "4266051244c910380e4d1db0e1fff6a0";


    var username = "userA";
    // Contacts Array
    var allContactsArray = ["usera","userb","userc","nfaa","nfab","nfac"]
    var contactsJSON = [];
    var broadcastJSON = [];
    var isUserFromNFA = this.state.userId.startsWith("nfa");
    var isUserSuperUser = this.state.userId === "nfaSuperUser";
    // var groupName = "NFAGroup";
    // var groupId = 8382972;
    var self = this;

    window.applozic.init({
      appId: applozicApplicationKey,      //Get your application key from https://www.applozic.com
      userId: this.state.userId,                     //Logged in user's id, a unique identifier for user
      // userName: username,                 //User's display name
      imageLink : '',                     //User's profile picture url
      email : '',                         //optional
      contactNumber: '',                  //optional, pass with internationl code eg: +13109097458
      desktopNotification: true,
      source: '1',                          // optional, WEB(1),DESKTOP_BROWSER(5), MOBILE_BROWSER(6)
      notificationIconLink: 'https://www.applozic.com/favicon.ico',    //Icon to show in desktop notification, replace with your icon
      authenticationTypeId: 1,          //1 for password verification from Applozic server and 0 for access Token verification from your server
      accessToken: '',                    //optional, leave it blank for testing purpose, read this if you want to add additional security by verifying password from your server https://www.applozic.com/docs/configuration.html#access-token-url
      locShare: true,
      googleApiKey: "AIzaSyDKfWHzu9X7Z2hByeW4RRFJrD9SizOzZt4",   // your project google api key
      googleMapScriptLoaded : false,   // true if your app already loaded google maps script
      mapStaticAPIkey: "AIzaSyCWRScTDtbt8tlXDr6hiceCsU83aS2UuZw",
      autoTypeSearchEnabled : false,     // set to false if you don't want to allow sending message to user who is not in the contact list
      loadOwnContacts : true, //set to true if you want to populate your own contact list (see Step 4 for reference)
      olStatus: true,         //set to true for displaying a green dot in chat screen for users who are online
      video:true,

      onInit : function(response) {

        console.log("init complete");
        console.log(response);
        // debugger;
         if (response === "success") {
            // login successful, perform your actions if any, for example: load contacts, getting unread message count, etc

            // window.$applozic.fn.applozic('getGroupList', {'callback':function (response) { //write your logic
              if (isUserFromNFA) {
                for (let i = 0; i < allContactsArray.length; i++) {
                  if (allContactsArray[i]!=self.state.userId) {
                    let tempObject = {"userId":allContactsArray[i]}
                    let tempObjectBroadcast = {"userId":allContactsArray[i], groupRole : 3}
                    contactsJSON.push(tempObject);
                    broadcastJSON.push(tempObjectBroadcast)
                  }
                }
                console.log(broadcastJSON);


              }
              else {
                for (let i = 0; i < allContactsArray.length; i++) {
                  if (allContactsArray[i].startsWith("nfa") && allContactsArray[i]!=self.state.userId) {
                    let tempObject = {"userId":allContactsArray[i]}
                    contactsJSON.push(tempObject);
                  }
                }
              }
              console.log(contactsJSON);
              window.$applozic.fn.applozic('loadContacts', {"contacts":contactsJSON});
              if (isUserSuperUser) {
                window.$applozic.fn.applozic('getGroupList', {'callback':function (response) {
                  console.log(response);
                if (response.data.length > 0) {
                  for (var i = 0; i < response.data.length; i++) {
                    if (response.data[i].name === "Broadcast Channel") {
                      console.log("already");
                      return;
                      // dont do anything.. broadcast already exists
                    }
                  }
                }
                console.log(self.state.userId);

                window.$applozic.fn.applozic('createGroup', {'groupName' : "Broadcast Channel",   // required
                                             'type' : 5, //(required) 1:private, 2:public, 5:broadcast,7:GroupofTwo

                                             // 'groupIcon' : group display image // optional
                                             'clientGroupId' : '',      // optional
                                             'users': broadcastJSON,
                                             'callback' : function(response){console.log(response);}});


                }});

              }

            //
            // }
            // });
           //  window.$applozic.fn.applozic('getUserDetail', {callback: function(response) {
           //       if(response.status === 'success') {
           //         console.log(response.data);
           //          // write your logic
           //       }
           //    }
           // });
           // window.$applozic.fn.applozic('addGroupMember',{'groupId': groupId,
           //                              // 'clientGroupId': clientGroupId, //use either groupId or clientGroupId
           //                              'userId': "three",
           //                              'role' :  3,  // (optional)  USER(0), ADMIN(1), MODERATOR(2), MEMBER(3)
           //                              'callback': function(response) {console.log(response);}
           //                              });
            // window.$applozic.fn.applozic('createGroup', {'groupName' : groupName,   // required
            //                                    'type' : 1, //(required) 1:private, 2:public, 5:broadcast,7:GroupofTwo
            //
            //                                    // 'groupIcon' : group display image // optional
            //                                    'clientGroupId' : '',      // optional
            //                                    'users': [{ userId:"NFAone",
            //                                                displayName:'',
            //                                                groupRole : 3  // (optional)  USER(0), ADMIN(1), MODERATOR(2), MEMBER(3)
            //                                              },
            //                                              { userId:"NFAtwo",
            //                                                displayName:'',
            //                                                groupRole :3  // (optional)  USER(0), ADMIN(1), MODERATOR(2), MEMBER(3)
            //                                              },
            //                                              { userId:"NFAthree",
            //                                                displayName:'',
            //                                                groupRole :3  // (optional)  USER(0), ADMIN(1), MODERATOR(2), MEMBER(3)
            //                                              }
            //
            //                                             ],
            //                                             'callback' : function(response){console.log(response);}});



         } else {
            // error in user login/register (you can hide chat button or refresh page)
         }
     },
     contactDisplayName: function(otherUserId) {
           //return the display name of the user from your application code based on userId.
           return "";
     },
     contactDisplayImage: function(otherUserId) {
           //return the display image url of the user from your application code based on userId.
           return "";
     },
     onTabClicked: function(response) {
           // write your logic to execute task on tab load
           //   object response =  {
           //    tabId : userId or groupId,
           //    isGroup : 'tab is group or not'
           //  }
           console.log(response);
     }
    });



  }

  render() {

    return (
      <div>
        <div className="form-group row">
          <p className="col-sm-12">Chat feature enabled.. Check for chat icon on bottom right part of your screen</p>
          <p className="col-sm-12">You are logged in as ** {this.state.userId} **</p>
        </div>

      </div>
    );
  }
}

export default Chat;
