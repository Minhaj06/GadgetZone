import React, { useCallback, useEffect, useState } from "react";
import { Upload, Modal, Button, Input, Form, Select, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAuth } from "../../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const { Option } = Select;

const ProductUpload = () => {
  const { setIsLoading } = useAuth();

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [form] = Form.useForm();
  const [photoList, setPhotoList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [product, setProduct] = useState(null);

  // hooks
  const { slug } = useParams();

  // Load product if slug exists
  useEffect(() => {
    if (slug) loadProduct();
  }, [slug]);

  // When product is loaded → set form values
  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        name: product?.name,
        description: product?.description,
        price: product?.price,
        category: product?.category?._id,
        subcategory: product?.subcategory?._id,
        shipping: product?.shipping ? "1" : "0",
        quantity: product?.quantity,
      });

      // Pre-filter subcategories & set selected one
      if (product?.category?._id) {
        handleCategoryChange(product?.category?._id, product?.subcategory?._id);
      }

      // Show previous photos
      if (product?.photos?.length) {
        const photos = product.photos.map((p, index) => ({
          uid: index,
          name: p.public_id,
          status: "done",
          url: p.url,
        }));
        setPhotoList(photos);
      }
    }
  }, [product]);

  // Load categories & subcategories
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/categories`);
        setCategories(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    })();

    (async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/subcategories`);
        setSubcategories(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // Load product details
  const loadProduct = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`/product/${slug}`);
      setProduct(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle category change
  const handleCategoryChange = useCallback(
    (categoryId, subcategoryId = null) => {
      setSelectedCategory(categoryId);

      // Filter subcategories by selected category
      const filtered = subcategories.filter(
        (subcategory) => subcategory?.category?._id === categoryId
      );
      setFilteredSubcategories(filtered);

      // Set/reset subcategory value
      if (subcategoryId) {
        form.setFieldsValue({ subcategory: subcategoryId });
      } else {
        form.setFieldsValue({ subcategory: null });
      }
    },
    [subcategories, form]
  );

  // Image preview handlers
  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewVisible(true);
  };
  const handleCancelPreview = () => setPreviewVisible(false);

  const onPhotoChange = ({ fileList }) => {
    setPhotoList(fileList.slice());
  };
  const onRemove = (file) => {
    const newPhotoList = photoList.filter((item) => item.uid !== file.uid);
    setPhotoList(newPhotoList);
  };

  // Submit handler
  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("category", values.category);
    formData.append("subcategory", values.subcategory);
    formData.append("shipping", values.shipping);
    formData.append("quantity", values.quantity);

    photoList.forEach((file) => {
      formData.append("photos", file.originFileObj);
    });

    const { data } = await axios.post(`/product`, formData);

    if (data?.error) {
      toast.error(data.error);
    } else {
      toast.success("Product added successfully");
      form.resetFields();
      setPhotoList([]);
      setSelectedCategory(null);
      setFilteredSubcategories([]);
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <div>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        labelCol={{ style: { fontWeight: 600 } }}
      >
        {/* Image preview */}
        <Modal open={previewVisible} footer={null} onCancel={handleCancelPreview}>
          <img alt="Preview" style={{ width: "100%" }} src={previewImage} />
        </Modal>

        <Row gutter={24}>
          {/* Photos */}
          <Col xs={24}>
            <Form.Item
              label="Photos"
              name="photos"
              rules={[{ required: true, message: "Please upload at least one photo" }]}
            >
              <Upload
                className="d-flex justify-content-center"
                listType="picture-card"
                beforeUpload={() => false}
                onChange={onPhotoChange}
                fileList={photoList}
                onPreview={handlePreview}
                onRemove={onRemove}
                multiple
              >
                {photoList.length >= 6 ? null : uploadButton}
              </Upload>
            </Form.Item>
          </Col>

          {/* Product Info */}
          <Col xs={24} lg={12}>
            <Row gutter={24}>
              <Col xs={24}>
                <Form.Item
                  label="Product Name"
                  name="name"
                  rules={[{ required: true, message: "Please enter the product name" }]}
                >
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  label="Price"
                  name="price"
                  rules={[{ required: true, message: "Please enter the product price" }]}
                >
                  <Input size="large" type="number" />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          {/* Description */}
          <Col xs={24} lg={12}>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please enter the product description" }]}
            >
              <Input.TextArea size="large" rows={5} />
            </Form.Item>
          </Col>

          {/* Category */}
          <Col xs={24} lg={12}>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please select the product category" }]}
            >
              <Select
                size="large"
                showSearch
                options={categories.map((c) => ({
                  value: c?._id,
                  label: c?.name,
                }))}
                optionFilterProp="label"
                filterSort={(a, b) =>
                  (a?.label ?? "").toLowerCase().localeCompare((b?.label ?? "").toLowerCase())
                }
                placeholder="Select Category"
                onChange={(value) => handleCategoryChange(value)} // ✅ reset subcategory on change
              />
            </Form.Item>
          </Col>

          {/* Subcategory */}
          <Col xs={24} lg={12}>
            <Form.Item
              label="Subcategory"
              name="subcategory"
              rules={[{ required: true, message: "Please select the product subcategory" }]}
            >
              <Select
                size="large"
                showSearch
                options={filteredSubcategories.map((s) => ({
                  value: s?._id,
                  label: s?.name,
                }))}
                optionFilterProp="label"
                filterSort={(a, b) =>
                  (a?.label ?? "").toLowerCase().localeCompare((b?.label ?? "").toLowerCase())
                }
                placeholder="Select Subcategory"
                disabled={!selectedCategory}
              />
            </Form.Item>
          </Col>

          {/* Shipping */}
          <Col xs={24} lg={12}>
            <Form.Item
              label="Shipping"
              name="shipping"
              rules={[{ required: true, message: "Please select the shipping option" }]}
            >
              <Select size="large">
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </Form.Item>
          </Col>

          {/* Quantity */}
          <Col xs={24} lg={12}>
            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[{ required: true, message: "Please enter the product quantity" }]}
            >
              <Input size="large" type="number" />
            </Form.Item>
          </Col>

          {/* Submit */}
          <Col xs={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {slug ? "Update Product" : "Add Product"}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ProductUpload;
