const todo = require('../model/todoSchema')
const mongodb = require('mongodb')
const { tdb } = require('../model/trackSchema')

module.exports.docfetch=async (req, res) => {
    // findById
    const arr =[];
    const taskObject= await tdb.find({userId:res.locals.userId})
    taskObject[0].space.forEach((e)=>{
        arr.push(e.spaceId.trim());
    })
    console.log(`docfetch:${taskObject[0].space} taskId:${arr} `,Array.isArray(arr))
    


    const data = await todo.find({_id:{$in: arr }})
    // console.log(`fetch: ${data}`);
     res.send(data)

}

// module.exports.docfetch=async (req, res) => {
//     const data = await todo.find()
//     console.log("data is retrieved successfully");
//     res.send(data)

// }

module.exports.docCreate=(req, res) => {
    console.log(req.body.taskDes);
    const list = {
        title: req.body.title,
        task: [{
            taskDes: req.body.taskDes,
            Status: req.body.Status
        }]
    }
    todo.insertMany(list)
    res.send({ data: "user can succefully enter new data" })
}

module.exports.docDelete=async(req, res) => {
    // console.log(`crudController id ${res.locals.userId}`)
    const taskObject= await tdb.find({ userId: res.locals.userId } );
    const selectedSpace = taskObject[0].space.filter((e)=>{
        return e.spaceId.trim() == req.body.id
    })
    const role = selectedSpace[0].role
    console.log(` spaceId ${selectedSpace}  role: ${role}`,Array.isArray(selectedSpace))
    console.log(`selectedSpace.Id=>`,selectedSpace[0]._id)

    if(role=="owner"){
        const userSpaceArray= await tdb.find();// finding all user and their spaces
        const space = [];
        userSpaceArray.forEach(e => {
            e.space.forEach(element =>{
                space.push(element)
    
            })
        });// pick out space and their id of all the user
        const spacearrayIds= space.filter((e)=>{
            return e.spaceId == req.body.id
        }
    
        )// filtering out spaces whose id is same as the 
        console.log("space",space,"userSpaceArray",spacearrayIds)
        // it removes the spaceId and userRole (space object ) from track collection  
        const clearSpace = await tdb.findByIdAndRemove({_id:{$in:spacearrayIds}})
        const id = new mongodb.ObjectId(req.body.id)
        // it delete the whole space with all the task from todo collection
        const removeSpace = await todo.findByIdAndRemove({ _id: id })

        console.log(`remove`,removeSpace,`selectedSpace`,selectedSpace[0]._id)
        // .then((res) => {
    
            res.send("data is successfully deleted")
        // }
        // )
        // .catch((err) => {
        //     console.log(err)
        // })
    
    }
    else{
        res.send("user doesn't have permission to delete the space")
    }
}

module.exports.itemUpdate= async (req, res) => {
    const taskObject= await tdb.find({ userId: res.locals.userId } );
    // const taskId=new mongodb.ObjectId(req.body.id)
    // const space = await todo.findOne({_id:taskId})
    console.log(`"crudcontroler itemupdte" spaceId:${req.body.spaceId} `)
    const selectedSpace = taskObject[0].space.filter((e)=>{
        return e.spaceId.trim() == req.body.spaceId
    })
    const role = selectedSpace[0].role
    console.log(` spaceId ${selectedSpace}  role: ${role}`,Array.isArray(selectedSpace))
    console.log(`selectedSpace.Id=>`,selectedSpace[0]._id)
    // // console.log(`PUT ID ${id}`)
    // console.log(req.body)

    // const objectId = new mongodb.ObjectId(req.body.id);

    // todo.updateOne(
    //     { "task._id": objectId },
    //     {
    //         "$set": { "task.$.taskDes": req.body.taskDes,
    //         "array.$.Status": req.body.Status },
    //         // "$set": { }
    //     },
    //     null,
    //     (err,res)=>{
    //         if(err){
    //             console.log("Error",err);
    //         }
    //         else{
    //             console.log("Response",res);
    //         }
    //     }
    // )

    
    res.send({ data: "tell me what to update" })
}

module.exports.fetchItems=async(req,res)=>{
    const id=new mongodb.ObjectId(req.body.id)
    const data =await todo.findById({_id:id})
    res.json(data)
}

module.exports.addItem=async(req,res)=>{
    const id=new mongodb.ObjectId(req.body.id)
    const data=await todo.updateOne({_id:id},{
        $push:{
            task:{
                
                taskDes:req.body.taskDes,
                Status:req.body.Status
            }
        }
    })
    console.log(`update item: id : ${id}`)
    console.log(`${data}`)
}