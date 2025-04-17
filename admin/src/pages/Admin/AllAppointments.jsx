import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets_admin/assets';

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1.2fr_1.3fr_2.8fr_2fr_1fr_1fr] py-3 px-6 border-b bg-gray-100 text-gray-700 font-medium">
          <p className="text-center">#</p>
          <p className="text-left">Patient</p>
          <p className="text-left">Payment</p>
          <p className="text-left">Age</p>
          <p className="text-left">Date & Time</p>
          <p className="text-left">Doctor</p>
          <p className="text-left">Fees</p>
          <p className="text-center">Actions</p>
        </div>

        {/* Table Data */}
        {appointments.map((item, index) => (
          <div
            className="grid grid-cols-[0.5fr_2fr_1.8fr_1.3fr_2.8fr_2fr_2fr_1fr] items-center text-gray-500 py-3 px-3 border-b hover:bg-gray-50"
            key={index}
          >
            <p className="text-center">{index + 1}</p>

            {/* Patient Name & Image */}
            <div className="flex items-center gap-2">
              <img className="w-8 rounded-full" src={item.userData.image} alt="Patient" />
              <p>{item.userData.name}</p>
            </div>

            {/* Payment Type */}
            <p className="text-center">{item.payment ? 'Online' : 'CASH'}</p>

            {/* Age */}
            <p>{calculateAge(item.userData.dob)} Years</p>

            {/* Appointment Date & Time */}
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

            {/* Doctor Name & Image */}
            <div className="flex items-center gap-2">
              <img className="w-8 rounded-full bg-gray-200" src={item.docData.image} alt="Doctor" />
              <p>{item.docData.name}</p>
            </div>

            {/* Fees */}
            <p className="text-center">{currency}{item.amount}</p>

            {/* Action: Cancel Button or Cancelled Text */}
            <div className="flex justify-center">
              {item.cancelled ? (
                <p className="text-red-400 text-xs font-medium">Cancelled</p>
              ) : (
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-6 cursor-pointer"
                  src={assets.cancel_icon}
                  alt="Cancel"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;

