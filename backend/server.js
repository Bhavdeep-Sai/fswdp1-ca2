const express = require('express');
const app = express();
const router = express.Router();

app.use(express.json());

const users = [
    {email:"alice@example.com", password:"alice123"},
    {email:"bob@example.com", password:"bob123"},
    {email:"charlie@example.com", password:"charlie123"}
]


router.get('/', (req,res)=>{
    try {
        res.status(200).json({msg:"Users Data", data:users})
    } catch (error) {
        res.status(500).json({msg:"Internal Serve Error", err:error.message})
    }
})

router.put('/update', (req,res)=>{
    const {email, password} = req.body
    try {
        const userUpdate = users.find(user => user.email === email);

        if(userUpdate){
            userUpdate.password = password;
            return res.status(200).json({msg:"User Updated", userData:userUpdate});
        }else{
            return res.status(404).json({msg:"Email not Found"})
        }
    } catch (error) {
        res.status(500).json({msg:"Internal Server Error", err:error.message})
    }
})


router.delete('/delete/:email', (req,res)=>{
    try {
        const email = req.params.email
        const index = users.findIndex(user => user.email === email);

        if(index != -1){
            users.splice(index, 1);
            return res.status(200).json({msg:"User deleted successfully"});
        }else{
            return res.status(404).json({msg:"Email not Found"})
        }
        
    } catch (error) {
        res.status(500).json({msg:"Internal Server Error", err:error.message})
    }
})


app.use('/user', router);

const PORT = 8000;
app.listen(PORT, ()=>{
    console.log(`server is running at http://localhost:${PORT}`)
})