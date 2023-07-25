const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const { Sales } = require("../models/sale");
const salesController = {
  getAll: (req, res) => {
    const typeParam = req.query.type; // 'type' parametresini al

    // Satışları 'type' parametresine göre filtrele (eğer typeParam değeri verilmişse)
    const filter = {};
    if (typeParam) {
      filter['category.woman.type'] = typeParam;
    
       filter['category.man.type'] = typeParam;
    }

    Sales.find(filter)
      .populate({
        path: "category",
        populate: {
          path: "woman",
          path: "man",
        },
      })
      .then((data) => {
        const datawithImageUrl = data.map((event) => {
          let imageUrl = event.imageUrl;
          if (Array.isArray(imageUrl)) {
            imageUrl = imageUrl.map((fileName) => `http://localhost:8000/img/${fileName}`);
          } else {
            imageUrl = `http://localhost:8000/img/${imageUrl}`;
          }

          // Güncelleme yapılacak kısım:
          const womanType = event.category.woman ? event.category.woman.type : null;
          const manType = event.category.man ? event.category.man.type : null;

          return {
            ...event.toObject(),
            category: {
              woman: {
                type: womanType,
              },
              man: {
                type: manType,
              },
            },
            imageUrl: imageUrl,
          };
        });
        res.json(datawithImageUrl);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getById: (req, res) => {
    let id = req.params.id;

    Sales.findById(id)
      .populate([ { path: "category" }])
      .then((data) => {
        const datawithImageUrl = data.map((event) => {
          let imageUrl = event.imageUrl;
          if (Array.isArray(imageUrl)) {
            imageUrl = imageUrl.map((fileName) => `http://localhost:8000/img/${fileName}`);
          } else {
            imageUrl = `http://localhost:8000/img/${imageUrl}`;
          }
  
          return {
            ...event.toObject(),
            imageUrl: imageUrl, // Resim URL'sini oluşturun
          };
        });
        res.json(datawithImageUrl);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

 
  add: (req, res) => {
    let files = req.files.photo;
    const currentDirPath = __dirname; 
    const uploadedFiles = [];

    if (!Array.isArray(files)) {
      files = [files];
    }

    files.forEach((file) => {
      const fileExtension = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExtension}`;
      const filePath = path.join(currentDirPath, '..', 'img', fileName);
      file.mv(filePath, function (err) {
        if (err) {
          return res.status(500).json(err);
        }
        uploadedFiles.push(fileName);

        if (uploadedFiles.length === files.length) {
          const sale = new Sales({
            name: req.body.name,
            category: req.body.category,
            imageUrl: uploadedFiles,
            size: req.body.size,
            color: req.body.color 
          });

          sale.save()
            .then((data) => res.send(data))
            .catch(err => res.status(500).json({ error: err.message }));
        }
      });
    });
  },

  deleteById: (req, res) => {
    let id = req.params.id;

    Sales.findByIdAndDelete(id)
      .then((data) => {
        res.json(data);
        console.log('info', 'Sale is Deleted', { message: 'sale deleted.. Id: ' + id });
      })
      .catch((err) => {
        res.status(500).json(err);
        console.log('error', 'Sale is not Deleted', { message: 'sale is not deleted.. Id: ' + id });
      });
  },
  update: (req, res) => {
    let id = req.params.id;

    Sales.findById(id)
      .then((data) => {
        data.sale = req.body.sale;

        data.save();

        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};

module.exports = {
  salesController,
};

