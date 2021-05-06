const {Fund, User, Donate} = require('../../models');
require('dotenv').config();
const Joi = require('joi');

exports.createFund = async (req, res) => {
    const {userId, title, thumbnail, goal, description} = req.body;
    //const data = req.body;
    try {
        //const user = await User.findOne({where: {id: req.userId}});

        // const schema = Joi.object({
        //     title: Joi.string()
        //     .min(3)
        //     .max(30)
        //     .required()
        //     .messages({
               
        //         'string.empty': `"a" cannot be an empty field`,
        //         'string.max': `should have a minimum length of {#limit}`
        //     }),
            
        //     goal: Joi.number()
        //     .min(1)
        //     .max(9999999)
        //     .required(),

        //     description: Joi.string()
        //     .min(3)
        //     .max(50)
        //     .required(),
        // });

        // const value = await schema.validateAsync(req.body);


        // if (!value) {
        //     Joi.isError(new Error()); // returns false
        // }

        const id = req.userId;

        const path = process.env.PATH_KEY;
        const thumbnail = req.files.imageFile[0].filename;

        const fund = await Fund.create({title, thumbnail, goal, description, userId:id});
        
        res.send({
            status: "success",
            data: {
              fund
            }
        });
        
        
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "something went wrong"
        })
    }
}

exports.getFund = async (req, res) => {
    try {
       
        const path = process.env.PATH_KEY;
        //const thumbnail = req.files.imageFile[0].filename;

        let funds = await Fund.findAll({
        include: [
            {
              model: User,
              // as: "user",
              attributes: {
                exclude: ["createdAt", "updatedAt", "password"]
              }
            },
            
            {
              model: Donate,
              //as: "donations",
              // through: {
              //   model: Donate,
              //   //as: "conjuction",
              //   //attributes: []
              // },
              attributes: {
                exclude: ["createdAt", "updatedAt"]
              }
            }
        ],
  
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          }
        });

        funds = JSON.parse(JSON.stringify(funds));
        funds = funds.map((fund) => {
          return {
            ...fund,
            image_url: process.env.PATH_KEY + fund.thumbnail,
          };
        });
        
        // console.log(funds)
          
        res.send({
          status: "success",
          data: {
            funds
          }
      });
    }catch (error) {
        console.log(error)
        res.send({
            status: "failed",
            message: "something went wrong"
        })
    }
}

exports.editFund = async (req, res) => {

    const id = req.params.id;
    const data = req.body;
    const {userId, title, thumbnail, goal, description} = req.body;

    try {
        //const fund = await Fund.findOne({where: {id}});
        const thumbnail = req.files.imageFile[0].filename;

        const edit = await Fund.update({userId, title, thumbnail, goal, description}, {where: {id}});

        console.log(edit)

        res.send({
            status: "success",
            data: {
              edit
            }
          });

    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "something went wrong"
        })
    }
}

exports.updateDonate = async (req, res) => {

    const id = req.params.id;
    const id2 = req.params.id2;
    const data = req.body;

    try {
        const fund = await Fund.findOne({where: {id}});
        const donate = await Donate.findOne({where: {id2}});

        const changeStatus = await Donate.update(data, {where: {donate}})

        if(!donate){
            return res.status(400).send({
                status: "Failed",
                message: "Data not found",
            });
        }

        return res.json(changeStatus);

    } catch (error) {
        
    }
}

exports.fundDetails = async (req, res) => {
    const {id} = req.params;

    try {
        let funds = await Fund.findOne({where: {id}});

        funds = JSON.parse(JSON.stringify(funds));   
      
          
        res.send({
          status: "success",
          data: {
            funds
          }
        });
    } catch (error) {
        console.log(error)
        res.send({
            status: "failed",
            message: "something went wrong"
        })
    }
}

exports.deleteFund = async (req, res) => {
    const {id} = req.params;

    try {
        const fund =  await Fund.findOne({where: {id}})

        if (fund) {
            await Fund.destroy({where: {id}})
        }

        return res.status(200).send({
            status: "success",
            message: "delete success"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: "failed",
            message: "something went wrong"
        })
    }
}


// exports.test = async (req, res) => {

    

//     try {
//         console.log(req.files)
//         res.send("Success")

//     } catch (error) {
//         console.log(error)
//         res.status(500).send({
//             status: "failed",
//             message: "something went wrong"
//         })
//     }
// }