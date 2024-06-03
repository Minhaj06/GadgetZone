import { Modal } from "antd";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Calculate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todaysSales, setTodaysSales] = useState(0);

  const handleCalculate = (e) => {
    e.preventDefault();

    const TodaysProductPurchase = parseInt(e.target.todaysProductPurchase.value);
    const DebtRepayment = parseInt(e.target.debtRepayment.value);
    const RemainingProductSale = parseInt(e.target.remainingProductSale.value);
    const OtherExpenses = parseInt(e.target.otherExpenses.value);
    const CurrentCash = parseInt(e.target.currentCash.value);
    //
    const PreviousCash = parseInt(e.target.previousCash.value);
    const TodaysLoan = parseInt(e.target.todaysLoan.value);
    const PrevRemainingAmount = parseInt(e.target.prevRemainingAmount.value);

    if (
      isNaN(TodaysProductPurchase) ||
      isNaN(DebtRepayment) ||
      isNaN(RemainingProductSale) ||
      isNaN(OtherExpenses) ||
      isNaN(CurrentCash) ||
      isNaN(PreviousCash) ||
      isNaN(TodaysLoan) ||
      isNaN(PrevRemainingAmount)
    ) {
      toast.error("Fill up all the fields!!!");
    } else {
      const TodaysSales =
        TodaysProductPurchase +
        DebtRepayment +
        RemainingProductSale +
        OtherExpenses +
        CurrentCash -
        PreviousCash -
        TodaysLoan -
        PrevRemainingAmount;

      setTodaysSales(TodaysSales);
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <section style={{ margin: "7rem 0" }}>
        <div className="container">
          <div className="row">
            <div className="col-xxl-7 col-xl-8 col-lg-9 mx-auto">
              <div className="bg-light p-4 rounded-3 border shadow mb-5">
                <h1 className="text-center display-5 themeColorSecondaryDark fw-medium mb-0">
                  <strong>বিক্রয় হিসাব</strong>
                </h1>
              </div>
              <div className="bg-light p-5 rounded-3 border shadow">
                <form onSubmit={handleCalculate} className="mt-5">
                  <div className="row row-cols-sm-2">
                    <div className="col mb-4">
                      <label className="form-label text-uppercase fs-4 mb-3">
                        পূর্বের ক্যাশ (টাকা)
                      </label>
                      <input
                        type="number"
                        name="previousCash"
                        className="form-control customInput fs-4"
                        defaultValue={0}
                        min={0}
                      />
                    </div>
                    <div className=" mb-4">
                      <label className="form-label text-uppercase fs-4 mb-3">
                        আজকের পণ্য ক্রয় (টাকা)
                      </label>
                      <input
                        type="number"
                        name="todaysProductPurchase"
                        className="form-control customInput fs-4"
                        defaultValue={0}
                        min={0}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label text-uppercase fs-4 mb-3">
                        আজকের ঋণ (টাকা)
                      </label>
                      <input
                        type="number"
                        name="todaysLoan"
                        className="form-control customInput fs-4"
                        defaultValue={0}
                        min={0}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label text-uppercase fs-4 mb-3">
                        পূর্বের ঋণ পরিশোধ (টাকা)
                      </label>
                      <input
                        type="number"
                        name="debtRepayment"
                        className="form-control customInput fs-4"
                        defaultValue={0}
                        min={0}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label text-uppercase fs-4 mb-3">
                        বাকিতে পণ্য বিক্রয় (টাকা)
                      </label>
                      <input
                        type="number"
                        name="remainingProductSale"
                        className="form-control customInput fs-4"
                        defaultValue={0}
                        min={0}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label text-uppercase fs-4 mb-3">
                        পূর্বের বাকী পাওয়া (টাকা)
                      </label>
                      <input
                        type="number"
                        name="prevRemainingAmount"
                        className="form-control customInput fs-4"
                        defaultValue={0}
                        min={0}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label text-uppercase fs-4 mb-3">
                        অন্যান্য খরচ (টাকা)
                      </label>
                      <input
                        type="number"
                        name="otherExpenses"
                        className="form-control customInput fs-4"
                        defaultValue={0}
                        min={0}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="form-label text-uppercase fs-4 mb-3">
                        বর্তমান ক্যাশ (টাকা)
                      </label>
                      <input
                        type="number"
                        name="currentCash"
                        className="form-control customInput fs-4"
                        defaultValue={0}
                        min={0}
                      />
                    </div>
                  </div>

                  <div className="text-end">
                    <button
                      className="btn btnDark rounded-pill px-20 py-10 fs-4"
                      type="submit"
                    >
                      আজকের বিক্রয়
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal
        centered
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <div className="py-5">
          <h1>
            আজকের বিক্রয়ঃ{" "}
            <strong className="">
              {new Intl.NumberFormat("bn-BD").format(todaysSales)} টাকা
            </strong>
          </h1>
        </div>
      </Modal>
    </>
  );
};

export default Calculate;
