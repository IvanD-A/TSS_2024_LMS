
export const post=async(url,body)=>{
  console.log(JSON.stringify(body));
    try {
        return fetch(url,
        {

            headers: {
              "access-control-allow-origin" : "*",
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(body)
        })


      } catch (error) {
        console.error(error);
          return error;
      }

}

