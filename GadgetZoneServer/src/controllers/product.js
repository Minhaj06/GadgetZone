const Product = require("../models/product.js");
const User = require("../models/user.js");
const Order = require("../models/order.js");
const fs = require("fs");
const slugify = require("slugify");
const braintree = require("braintree");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_KEY);

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

// Create Product With Single Image
// exports.create = async (req, res) => {
//   try {
//     // console.log(req.fields);
//     // console.log(req.files);

//     const { name, description, price, category, subcategory, quantity, isFeatured, shipping } =
//       req.fields;
//     console.log(name);

//     const { photo } = req.files;
//     // console.log("PHOTO========>", photo);

//     // Validation
//     switch (true) {
//       case !description.trim():
//         return res.json({ error: "Description is required" });
//       case !price.trim():
//         return res.json({ error: "Price is required" });
//       case !category.trim():
//         return res.json({ error: "Category is required" });
//       case !quantity.trim():
//         return res.json({ error: "Quantity is required" });
//       case !shipping.trim():
//         return res.json({ error: "Shipping is required" });
//       case photo && photo.size > 1000000:
//         return res.json({ error: "Image should be less than 1mb in size" });
//     }

//     // Existiong Product
//     const existingProduct = await Product.findOne({ name });
//     if (existingProduct) {
//       return res.json({ error: "Product already exists" });
//     }

//     // Create Product
//     const product = new Product({ ...req.fields, slug: slugify(name) });

//     if (photo) {
//       product.photo.data = fs.readFileSync(photo.path);
//       product.photo.contentType = photo.type;
//     }

//     await product.save();
//     res.json(product);
//   } catch (err) {
//     console.log(err);
//     return res.status(400).json(err.message);
//   }
// };

// Create Product With Multiple Image
exports.create = async (req, res) => {
  try {
    const { name, description, price, category, subcategory, quantity, isFeatured, shipping } =
      req.fields;

    const { photos } = req.files;

    // Handle multiple files
    const receivedPhotos = Array.isArray(photos) ? photos : [photos];
    if (receivedPhotos.length > 6) {
      return res.json({ error: "Exceeded the maximum number of images allowed (6)." });
    }

    // Validation
    switch (true) {
      case !description.trim():
        return res.json({ error: "Description is required" });
      case !price.trim():
        return res.json({ error: "Price is required" });
      case !category.trim():
        return res.json({ error: "Category is required" });
      case !quantity.trim():
        return res.json({ error: "Quantity is required" });
      case !shipping.trim():
        return res.json({ error: "Shipping is required" });
    }

    // Existing Product
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.json({ error: "Product already exists" });
    }

    // Create Product
    const product = new Product({ ...req.fields, slug: slugify(name) });

    if (receivedPhotos) {
      product.photos = []; // Create an empty array to store photo data
      for (let i = 0; i < receivedPhotos.length; i++) {
        const photo = receivedPhotos[i];
        if (photo.size > 1000000) {
          return res.json({ error: "Each image should be less than 1mb in size" });
        }
        const photoData = {
          data: fs.readFileSync(photo.path),
          contentType: photo.type,
        };
        product.photos.push(photoData); // Add each photo data to the array
      }
    }

    await product.save();
    res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

exports.list = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .populate("subcategory")
      .select("-photos")
      .limit(12)
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

exports.read = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .select("-photos")
      .populate("category");

    res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

// Previous======================>
// exports.photo = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.productId).select("photo");

//     if (product.photo.data) {
//       res.set("Content-Type", product.photo.contentType);
//       res.set("Cross-Origin-Resource-Policy", "cross-origin"); // add this line
//       return res.send(product.photo.data);
//     } else {
//       return res.status(404).json("Photo not found");
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(400).json(err.message);
//   }
// };

// Send Single Photo
exports.photo = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).select("photos");

    if (product.photos[0].data) {
      res.set("Content-Type", product.photos[0].contentType);
      res.set("Cross-Origin-Resource-Policy", "cross-origin"); // add this line
      return res.send(product.photos[0].data);
    } else {
      return res.status(404).json("Photo not found");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

// Send Multiple Photos
exports.photos = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).select("photos");

    if (product.photos.length > 0) {
      const photoResponses = [];

      for (const photo of product.photos) {
        const photoResponse = {
          contentType: photo.contentType,
          data: photo.data,
        };
        photoResponses.push(photoResponse);
      }

      return res.json({ photos: photoResponses });
    } else {
      return res.status(404).json("Photos not found");
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

exports.remove = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId).select("-photos");
    res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

// exports.update = async (req, res) => {
//   try {
//     // console.log(req.fields);
//     // console.log(req.files);

//     const { name, description, price, category, subcategory, quantity, isFeatured, shipping } =
//       req.fields;

//     const { photos } = req.files;
//     // console.log("PHOTO========>", photo);

//     // Validation
//     switch (true) {
//       case !name?.trim():
//         return res.json({ error: "Name is required" });
//       case !description?.trim():
//         return res.json({ error: "Description is required" });
//       case !price?.trim():
//         return res.json({ error: "Price is required" });
//       case !category?.trim():
//         return res.json({ error: "Category is required" });
//       case !quantity?.trim():
//         return res.json({ error: "Quantity is required" });
//       case !shipping?.trim():
//         return res.json({ error: "Shipping is required" });
//       case photo && photo.size > 1000000:
//         return res.json({ error: "Image should be less than 1mb in size" });
//     }

//     // Update Product
//     const product = await Product.findByIdAndUpdate(
//       req.params.productId,
//       {
//         ...req.fields,
//         slug: slugify(name),
//       },
//       { new: true }
//     );

//     if (photo) {
//       product.photos.data = fs.readFileSync(photo.path);
//       product.photos.contentType = photo.type;
//     }

//     await product.save();
//     res.json(product);
//   } catch (err) {
//     console.log(err);
//     return res.status(400).json(err.message);
//   }
// };

// Update Product With Multiple Image
exports.update = async (req, res) => {
  try {
    // console.log(req.fields);
    // console.log(req.files);

    const { name, description, price, category, subcategory, quantity, isFeatured, shipping } =
      req.fields;

    const { photos } = req.files;

    // Handle multiple files
    const receivedPhotos = Array.isArray(photos) ? photos : [photos];
    if (receivedPhotos.length > 6) {
      return res.json({ error: "Exceeded the maximum number of images allowed (6)." });
    }

    // Validation
    switch (true) {
      case !name?.trim():
        return res.json({ error: "Name is required" });
      case !description?.trim():
        return res.json({ error: "Description is required" });
      case !price?.trim():
        return res.json({ error: "Price is required" });
      case !category?.trim():
        return res.json({ error: "Category is required" });
      case !quantity?.trim():
        return res.json({ error: "Quantity is required" });
      case !shipping?.trim():
        return res.json({ error: "Shipping is required" });
    }

    // Find the existing product by name
    const existingProduct = await Product.findOne({ name });

    // Check if the existing product is different from the one being updated
    if (existingProduct && existingProduct._id.toString() !== req.params.productId) {
      return res.json({ error: "Product with this name already exists" });
    }

    // Update Product
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );

    if (receivedPhotos) {
      product.photos = []; // Clear existing photos
      for (let i = 0; i < receivedPhotos.length; i++) {
        const photo = receivedPhotos[i];
        if (photo.size > 1000000) {
          return res.json({ error: "Each image should be less than 1mb in size" });
        }
        const photoData = {
          data: fs.readFileSync(photo.path),
          contentType: photo.type,
        };
        product.photos.push(photoData);
      }
    }

    await product.save();
    res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

exports.filteredProducts = async (req, res) => {
  try {
    const { categoryChecked, subcategoryChecked, priceRange } = req.body;

    let args = {};
    if (categoryChecked.length > 0) args.category = categoryChecked;
    if (subcategoryChecked.length > 0) args.subcategory = subcategoryChecked;
    if (priceRange.length) args.price = { $gte: priceRange[0], $lte: priceRange[1] };
    // console.log("args ==> ", args);

    const products = await Product.find(args).select("-photos");
    // console.log("Filtered products query ==> ", products.length);
    res.json(products);
    return;
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
};

exports.productCount = async (req, res) => {
  try {
    const total = await Product.find({}).estimatedDocumentCount();
    res.json(total);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

exports.listProducts = async (req, res) => {
  try {
    const perPage = req.params?.perPage || 8;
    const page = req.params.page ? req.params.page : 1;

    const products = await Product.find({})
      .populate("category")
      .populate("subcategory")
      .select("-photos")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

exports.productSearch = async (req, res) => {
  try {
    const { keyword, category } = req.query;
    console.log(category);
    let query = {
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    if (category !== undefined) {
      query.category = category;
    }
    const results = await Product.find(query).select("-photos");
    res.json(results);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

exports.relatedProducts = async (req, res) => {
  try {
    const { productId, categoryId } = req.params;
    const related = await Product.find({
      category: categoryId,
      _id: { $ne: productId },
    })
      .select("-photos")
      .populate("category")
      .limit(8);

    res.json(related);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

exports.trendingProducts = async (req, res) => {
  try {
    const trendingProducts = await Product.find({})
      .populate("category")
      .populate("subcategory")
      .select("-photos")
      .limit(8)
      .sort({ sold: -1 });

    res.json(trendingProducts);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

exports.featuredProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true })
      .populate("category")
      .populate("subcategory")
      .select("-photos")
      .limit(8)
      .sort({ createdAt: -1 });

    res.json(featuredProducts);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

/*
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

exports.getToken = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

exports.processPayment = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const { shippingAddress, discountPercentage, shippingCharge } = req.body;

    if (!shippingAddress && !user?.address) {
      return res.send({ error: "User address or shipping address required" });
    }

    const { nonce, cart } = req.body;

    let total = 0;
    cart.map((i) => {
      total += i.price;
    });

    let discount = (total / 100) * discountPercentage;

    let amount = total + shippingCharge - discount;

    let newTransaction = gateway.transaction.sale(
      {
        amount: amount,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          // res.send(result);
          const orderData = {
            products: cart,
            discountPercentage: discountPercentage,
            payment: result,
            buyer: req.user._id,
          };

          if (shippingAddress) orderData.shippingAddress = shippingAddress;

          // create order
          const order = new Order(orderData).save();
          // decrement quantity
          decrementQuantity(cart);
          // const bulkOps = cart.map((item) => {
          //   return {
          //     updateOne: {
          //       filter: { _id: item._id },
          //       update: { $inc: { quantity: -0, sold: +1 } },
          //     },
          //   };
          // });

          // Product.bulkWrite(bulkOps, {});

          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const decrementQuantity = async (cart) => {
  try {
    // build mongodb query
    const bulkOps = cart.map((item) => {
      return {
        updateOne: {
          filter: { _id: item._id },
          update: { $inc: { quantity: -0, sold: +item?.cartQuantity } },
        },
      };
    });

    const updated = await Product.bulkWrite(bulkOps, {});
    console.log("blk updated", updated);
  } catch (err) {
    console.log(err);
  }
};

exports.orderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true }).populate(
      "buyer",
      "email name"
    );
    // send email

    // prepare email
    const emailData = {
      from: process.env.EMAIL_FROM,
      to: order.buyer.email,
      subject: "Order status",
      html: `
        <h1>Hi ${order.buyer.name}, Your order's status is: <span style="color:red;">${order.status}</span></h1>
        <p>Visit <a href="${process.env.CLIENT_URL}/dashboard/user/orders">your dashboard</a> for more details</p>
      `,
    };

    try {
      await sgMail.send(emailData);
    } catch (err) {
      console.log(err);
    }

    res.json(order);
  } catch (err) {
    console.log(err);
  }
};
