export async function tryCatch(fun, req, res){
    try{
        await fun(req, res)
    }catch(error){
        console.error(error)
        res.status(500).json({error:error})
    }
}