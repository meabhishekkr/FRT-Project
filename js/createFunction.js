async function create() {

    const name1 = document.getElementById("user").value;
    const mail1 = document.getElementById("mail").value;
    const numb1 = document.getElementById("numb").value;
    const comment1 = document.getElementById("comment").value;

      if (!name1 || !mail1 || !numb1 || !comment1) {
      
         if (!name1) user.classList.add("error"); else user.classList.remove("error");

         if (!mail1) mail.classList.add("error"); else mail.classList.remove("error");

         if (!numb1) numb.classList.add("error");else numb.classList.remove("error");

         if (!comment1) comment.classList.add("error");else comment.classList.remove("error");

         alert("Please fill out all the required fields.");
         
         return; 
      }else{
         user.classList.remove("error");
         mail.classList.remove("error");
         numb.classList.remove("error");
         comment.classList.remove("error");      }
    
    const now = new Date();
    const timestamp = now.toISOString();
    
    const data = {
    id: timestamp,
    Name:name1,
    mailId: mail1,
    mob: numb1,
    message: comment1
    };

    const gql = `
    mutation create($item: CreatePersonInput!) {
       createPerson(item: $item) {
          id
          Name
          mailId
          mob
          message
       }
    }`;

    const query = {
    query: gql,
    variables: {
       item: data
    } 
    };

    const endpoint = "/data-api/graphql";
    const result = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(query)
    });

    const response = await result.json();
    console.table(response.data.createPerson);

    if (response.data.createPerson) {
       console.log("feedback submitted");
       window.alert("Thank You for your valuable feedback.");
       user.value= "";
       mail.value= "";
       numb.value= "";
       comment.value= "";
    }else{
       console.log("feedback not submitted");
       window.alert("Feedback not sent. Please try again.");
    }
 }