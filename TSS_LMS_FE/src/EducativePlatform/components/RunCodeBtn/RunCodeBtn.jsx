export const RunCodeBtn = ({code,className,onOutputChange}) => {
    const uploadCode= async ()=>{
    
      const headerContent={'Accept': 'application/json','Content-Type': 'application/json'}
    
      const bodyContent=JSON.stringify({className: className, code:code, extention:'java'});


      const petition = await fetch('http://localhost:3001/api/compiler', {
        method: 'POST',
        headers: headerContent,
        body: bodyContent
      });


      const response=await petition.json();
      onOutputChange(response)
    }
    
      return (
    <button className="btn btn-primary h-25" onClick={()=>{uploadCode()}}>Run Code</button>
      )
    }