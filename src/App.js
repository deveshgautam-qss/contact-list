import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UsersList from './components/users-list';
import UserDetails from './components/user-details';
import AddUserForm from './components/add-user-form';
import Modal from './components/UI/modal';
import React, {useState} from 'react';

function App() {
  /*
  var sampleRecords = [
    {
      id: 1,
      email: "deveshgautam@gmail.com",
      firstname: "Devesh",
      group: "work",
      lastname: "Gautam",
      middlename: "Kumar",
      notificationCheck: true
    },
    {
      id: 2,
      email: "anubhav@gmail.com",
      firstname: "Anubhav",
      group: "work",
      lastname: "Sharma",
      middlename: "Kumar",
      notificationCheck: false
    }    
  ];
  */

  const [showModel, setShowModel] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelecteduser] = useState({});

  function onUserClick(id){
    let user = userList.find((user) => user.id === id);
    setSelecteduser(user)
  }

  function onContactSave(obj){
    debugger
    if(Object.getOwnPropertyNames(obj).indexOf("id") === -1){
      obj["id"] = userList.length + 1;
      userList.push(obj);
      setUserList(userList);
    } else {      
      var newUserList = userList.map(user => (user.id === obj.id) ? obj : user)
      setUserList(newUserList);
      setSelecteduser(obj);
    }
    setShowModel(false);
  }

  function onEditClick(){
    setShowModel(true);
    setModalTitle("Edit")
  }

  function onDeleteClick(){
    let userId = selectedUser["id"];
    let userIndex = userList.map(function(x) {return x.id; }).indexOf(userId);
    userList.splice(userIndex, 1);

    setUserList(userList);
    setShowModel(false);
    setSelecteduser({});
    setModalTitle("")
  }

  function onAddContactButton(){
    setShowModel(true);
    setModalTitle("Add")
  }

  function onModelClose(){
    setShowModel(false);
  }

  return (
    <div id="app" className="p-4">
      <div className="container border p-4">
        <div className="row">
          <div className='col-md-4'>
            <UsersList 
              onAddContactButton={onAddContactButton} 
              userList={userList} 
              onUserClick={onUserClick}
              selectedUser={selectedUser} 
              />
          </div>
          <div className='col-md-8'>
            {
              Object.getOwnPropertyNames(selectedUser).length ? 
              <UserDetails 
                selectedUser={selectedUser} 
                onEditClick={onEditClick}
                onDeleteClick={onDeleteClick} /> : 
              <div className="text-center" 
                style={{fontSize: "30px", fontWeight: "600", color: "#9e9e9e"}}> 
                No User Selected! 
              </div>
            }
          </div>
        </div>
      </div>
      {showModel &&
        <Modal title={modalTitle} onModelClose={onModelClose}>
          <AddUserForm 
            onModelClose={onModelClose} 
            selectedUser={modalTitle.toLowerCase() === "edit" ? selectedUser : {}}
            onContactSave={onContactSave}
          />
        </Modal>
      }
    </div>  
  );
}

export default App;
