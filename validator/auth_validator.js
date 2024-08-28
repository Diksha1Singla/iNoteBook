const {zod, z} = require("zod");
const schemaStructure = z.object({
    name:z
    .string({required_error:"Name Required"})
    .trim()
    .min(3,{message:"name must be of min 3 characters"})
    .max(256,{message:"name must not exceed 256 characters"}),

    email:z
    .string({required_error:"Email Required"})
    .trim()
    .email({message:"Invalid Email"})
    .min(3,{message:"name must be of min 3 characters"})
    .max(256,{message:"name must not exceed 256 characters"}),

    password:z
    .string({required_error:"password Required"})
    .min(3,{message:"name must be of min 3 characters"})
    .max(256,{message:"name must not exceed 256 characters"}),

})

module.exports = schemaStructure