import axios from "axios";
import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useAuth } from "../../context/auth";
import moment from "moment";
import strPadStart from "../../utils/strPadStart";
import { Link } from "react-router-dom";
import StatusBadge from "../../components/statusBadge/StatusBadge";
import ProductCardHorizontal from "../../components/cards/productCard/ProductCardHorizontal";
import { FaEye } from "react-icons/fa";
import { Modal } from "antd";

const Orders = () => {
  // context
  const { auth, isLoading, setIsLoading } = useAuth();

  // state
  const [orders, setOrders] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    auth?.token &&
      (async () => {
        try {
          setIsLoading(true);
          const { data } = await axios.get("/orders");
          setOrders(data);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
          setIsLoading(false);
        }
      })();
  }, [auth?.token]);

  return (
    <>
      <div>
        <div className="mb-5">
          <h2 className="display-4 fw-medium">Orders</h2>
        </div>

        <div className="table-responsive">
          <table style={{ minWidth: "80rem" }} className="table table-striped align-middle">
            <thead>
              <tr className="border-bottom border-dark border-1">
                <th>#</th>
                <th>Status</th>
                <th>Buyer</th>
                <th>Ordered</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Quantity</th>
                <th>View Products</th>
              </tr>
            </thead>
            <tbody>
              {orders.length ? (
                orders.map((order, index) => (
                  <tr key={order?._id}>
                    <th>{index + 1}</th>
                    <td className="py-25">{order?.status}</td>
                    <td className="py-25">
                      {order?.shippingAddress
                        ? order.shippingAddress?.firstName +
                          " " +
                          order.shippingAddress?.lastName
                        : order?.buyer?.firstName + " " + order?.buyer?.lastName}
                    </td>
                    <td className="py-25">{moment(order?.createdAt).fromNow()}</td>
                    <td className="py-25">
                      {order?.payment?.success ? (
                        <StatusBadge status="Success" bordered />
                      ) : (
                        <StatusBadge status="Failed" bordered />
                      )}
                    </td>
                    <td className="py-25">
                      <StatusBadge status={order?.status} rounded />
                    </td>
                    <td className="py-25 text-center">
                      {strPadStart(order?.products?.length)}
                    </td>
                    <td className="py-25 text-center">
                      <FaEye
                        onClick={() => {
                          setSelectedProducts(order?.products);
                          setModalOpen(true);
                        }}
                        size={24}
                        role="button"
                        className="textColor hoverableOp"
                      />
                    </td>
                  </tr>
                ))
              ) : isLoading ? (
                [0, 1, 2, 3, 4, 5].map((item) => (
                  <tr key={item}>
                    <td className="py-25">
                      <Skeleton width={20} height={20} />
                    </td>
                    <td className="py-25">
                      <Skeleton width={100} />
                    </td>
                    <td className="py-25">
                      <Skeleton width={120} />
                    </td>
                    <td className="py-25">
                      <Skeleton width={70} />
                    </td>
                    <td className="py-25">
                      <Skeleton borderRadius={1000} />
                    </td>
                    <td className="py-25">
                      <Skeleton borderRadius={1000} />
                    </td>
                    <td className="py-25">
                      <Skeleton />
                    </td>
                    <td className="text-center">
                      <Skeleton borderRadius={5} width={28} height={28} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-50" colSpan={8}>
                    <div className="text-center py-50">
                      <h2 className="h1">No orders available</h2>
                      <p>It seems like you haven't placed any orders yet.</p>
                      <Link to="/cart" className="btn btnDark py-3 px-5 mt-4">
                        Place an Order
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        title=<h2 className="mb-5">
          {selectedProducts?.length > 1
            ? `${selectedProducts?.length} products`
            : `${selectedProducts?.length} product`}
        </h2>
        centered
        width={1000}
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <div className="row g-5">
          {selectedProducts.map((product) => (
            <div key={product?._id} className="col-12">
              <ProductCardHorizontal product={product} />
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default Orders;
