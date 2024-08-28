import React, { useEffect, useState } from "react";
import { Upload, Modal, Button, Input, Form, Select, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAuth } from "../../../context/auth";
import axios from "axios";

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

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`/categories`);
        setCategories(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    })();
    (async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`/subcategories`);
        setSubcategories(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

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

  const handleCategoryChange = (categoryId) => {
    console.log("categoryId", categoryId);
    setSelectedCategory(categoryId);
    console.log("subcategories", subcategories);
    const filtered = subcategories.filter(
      (subcategory) => subcategory?.category?._id === categoryId
    );
    console.log("filtered", filtered);
    setFilteredSubcategories(filtered);
    form.setFieldsValue({ subcategory: null });
  };

  const onFinish = (values) => {
    console.log("Submitted values:", values);
    console.log("Selected images:", photoList);
  };

  // const initialValues = {
  //   name: "BenQ Monitor",
  //   description: "Best quality BenQ Monitor",
  // };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  return (
    <div>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        // initialValues={initialValues}
        labelCol={{ style: { fontWeight: 600 } }}
      >
        {/*  */}
        <Modal open={previewVisible} footer={null} onCancel={handleCancelPreview}>
          <img alt="Preview" style={{ width: "100%" }} src={previewImage} />
        </Modal>
        {/*  */}

        <Row gutter={24}>
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
                  <Input size="large" type="number" value={15000} />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col xs={24} lg={12}>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please enter the product description" }]}
            >
              <Input.TextArea size="large" rows={5} />
            </Form.Item>
          </Col>

          <Col xs={24} lg={12}>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please select the product category" }]}
            >
              <Select
                size="large"
                showSearch
                options={categories.map((category) => ({
                  value: category?._id,
                  label: category?.name,
                }))}
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                placeholder="Select Category"
                onChange={handleCategoryChange}
              ></Select>
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item
              label="Subcategory"
              name="subcategory"
              rules={[{ required: true, message: "Please select the product category" }]}
            >
              <Select
                size="large"
                showSearch
                options={filteredSubcategories.map((subcategory) => ({
                  value: subcategory?._id,
                  label: subcategory?.name,
                }))}
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                placeholder="Select Subcategory"
                disabled={!selectedCategory}
              ></Select>
            </Form.Item>
          </Col>
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
          <Col xs={24} lg={12}>
            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[{ required: true, message: "Please enter the product quantity" }]}
            >
              <Input size="large" type="number" value={5} />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ProductUpload;
