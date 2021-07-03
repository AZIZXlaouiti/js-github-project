

document.addEventListener("DOMContentLoaded",()=>{
    const form = document.querySelector("#github-form")
    const input = document.getElementById('search')
    form.addEventListener('submit',(e)=>{
        e.preventDefault()
        
        if (input.value !== ""){
            console.log(input.value)
            const output = input.value
            input.value = ""
            
            fetch("https://api.github.com/search/users?q="+output)
            .then(resp=>resp.json())
            .then(data=>data.items.forEach(element=>Load(element,output)))
        }
        
    
    })
})
function Load(data,output){
 let user = document.getElementById("user-list")
 for (i = 1 ; i<=3;i++){
    let list = document.createElement("li")
    if (i===1){
        list.innerText = "username: "+ data.login 
        list.style.cursor  = "pointer"
        list.addEventListener('click',()=>{
            fetch(`https://api.github.com/users/${output}/repos`).then(resp=>resp.json())
            .then(data=>data.forEach(element=>{
                let repos = document.createElement("li")
                repos.innerText = "repository : "+element.name
                list.appendChild(repos)
            }))
                
            
        })
        
    }
    else if (i===2){
        let img = document.createElement('img')
        img.src  = data.avatar_url
        list.appendChild(img)
        
    } 
    else {
        let profile = document.createElement('a')
        profile.href = data.html_url
        profile.innerText = "profile"
        list.appendChild(profile)
        
  }
  user.appendChild(list)
 }
}



