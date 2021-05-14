const {Donate, User, Fund} = require('../../models');

exports.createDonate = async (req, res) => {
    const {userId, fundId, donateAmount, status, proofAttachment} = req.body;
    try {
      const id = req.userId;
      const id2 = req.params.id2;
      console.log(id2)
      
      const proofAttachment = req.files.imageFile[0].filename;
      const donate = await Donate.create({userId: id, fundId: id2, donateAmount, status: "Pending", proofAttachment });
        
        return res.json(donate);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "something went wrong"
        })
    }
}

exports.approveDonate = async (req, res) => {
  const id = req.params.id;
  const data = req.body

  try {
    const approve = await Donate.update({...data, status: "Approved"}, {where: {id: id}})
   
    return res.json(approve);
  } catch (error) {
    console.log(error);
    res.send({
        status: "failed",
        message: "something went wrong"
    })
  }
}

exports.getDonate = async (req, res) => {
  
    //const id = req.params.id;
    const id = req.params.id;
    console.log(id)

    try {
    
    let donos = await Donate.findAll({where: {fundId: id},
        include: [
          {
            model: User,
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"]
            }
          },
          
          {
            model: Fund,
            attributes: {
              exclude: ["createdAt", "updatedAt"]
            }
          }
        ],
      
    });

      donos = JSON.parse(JSON.stringify(donos));
      donos = donos.map((dono) => {
        return {
          ...dono,
          image_url: process.env.PATH_KEY + dono.proofAttachment
        };
      });
      
      console.log(donos)
      console.log(donos.fundId)

      res.send({
        status: "success",
        data: {
          donos
        }
    });


    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "server error"
        })
    }
}

exports.getUserDonate = async (req, res) => {
  
    //const id = req.params.id;
    const id = req.userId;

    try {

      // const user = await User.findOne({where:{id}});
      // user = JSON.parse(JSON.stringify(user));
      // user = user.map(userData => userData.id);
      // console.log(user)
    
    let donos = await Donate.findAll({where: {userId : id},
        include: [
          {
            model: User,
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"]
            }
          },
          
          {
            model: Fund
          }
        ],
      
    });

      donos = JSON.parse(JSON.stringify(donos));
      donos = donos.map((dono) => {
        return {
          ...dono,
          image_url: process.env.PATH_KEY + dono.proofAttachment
        };
      });
      
      console.log(donos)

      res.send({
        status: "success",
        data: {
          donos
        }
    });


    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "server error"
        })
    }
}

