

const mongoose= require ('mongoose')

const connectDB=async ()=>{
    try {
        await mongoose.connect('mongodb+srv://jcisanjanakashimkar:bpBZYWpuP05WOg32@cluster0.8s6ia.mongodb.net/newcarsnagpur')
        console.log('mongo connected');
        
    } catch (error) {
        console.log(error);
        
    }
}
module.exports={connectDB}