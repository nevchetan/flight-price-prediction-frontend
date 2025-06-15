import React, { useState } from "react";
import axios from "axios";
import "./styles.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FlightPricePredictor = () => {
  const initialState = {
    Airline: "",
    Source: "",
    Destination: "",
    Total_Stops: "",
    Additional_Info: "",
    flightDate: null,
    deptTime: null,
    arrivalTime: null,
    duration_hour: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const airlineOptions = [
    { label: "Jet Airways", value: 0 },
    { label: "IndiGo", value: 1 },
    { label: "Air India", value: 3 },
    { label: "SpiceJet", value: 4 },
    { label: "Vistara", value: 5 },
  ];

  const sourceOptions = [
    { label: "Delhi", value: 0 },
    { label: "Kolkata", value: 1 },
    { label: "Mumbai", value: 2 },
    { label: "Chennai", value: 3 },
    { label: "Bangalore", value: 4 },
  ];

  const destinationOptions = [
    { label: "Cochin", value: 5 },
    { label: "Delhi", value: 0 },
    { label: "New Delhi", value: 1 },
    { label: "Hyderabad", value: 2 },
    { label: "Kolkata", value: 3 },
  ];

  const additionalInfoOptions = [
    { label: "No info", value: 8 },
    { label: "In-flight meal not included", value: 0 },
    { label: "No check-in baggage included", value: 1 },
    { label: "1 Long layover", value: 2 },
    { label: "Change airports", value: 3 },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFormData(initialState);
    setPrediction(null);
  };

  const handleSubmit = async () => {
    if (formData.Source === formData.Destination) {
      alert("Source and Destination cannot be the same.");
      return;
    }

    setLoading(true);
    try {
      const { flightDate, deptTime, arrivalTime } = formData;

      const res = await axios.post(
        "https://flight-price-prediction-backend-35s3.onrender.com",
        {
          Airline: Number(formData.Airline),
          Source: Number(formData.Source),
          Destination: Number(formData.Destination),
          Total_Stops: parseFloat(formData.Total_Stops),
          Additional_Info: Number(formData.Additional_Info),
          date: flightDate?.getDate(),
          month: flightDate?.getMonth() + 1,
          dept_hour: deptTime?.getHours(),
          dept_min: deptTime?.getMinutes(),
          arrival_hour: arrivalTime?.getHours(),
          arrival_min: arrivalTime?.getMinutes(),
          duration_hour: Number(formData.duration_hour),
        }
      );

      setPrediction(res.data.predicted_price);
    } catch (error) {
      alert("Prediction failed. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Flight Price Predictor</h2>

      <form className="form-grid" onSubmit={(e) => e.preventDefault()}>
        {/* Dropdowns */}
        {[
          { label: "Airline", name: "Airline", options: airlineOptions },
          { label: "Source", name: "Source", options: sourceOptions },
          {
            label: "Destination",
            name: "Destination",
            options: destinationOptions,
          },
          {
            label: "Additional Info",
            name: "Additional_Info",
            options: additionalInfoOptions,
          },
        ].map(({ label, name, options }) => (
          <div className="form-group" key={name}>
            <label>{label}</label>
            <select name={name} value={formData[name]} onChange={handleChange}>
              <option value="">Select {label}</option>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        ))}

        <div className="form-group">
          <label>Total Stops</label>
          <input
            type="number"
            name="Total_Stops"
            value={formData.Total_Stops}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Flight Date</label>
          <DatePicker
            selected={formData.flightDate}
            onChange={(date) => setFormData({ ...formData, flightDate: date })}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
            className="datepicker"
          />
        </div>

        <div className="form-group">
          <label>Departure Time</label>
          <DatePicker
            selected={formData.deptTime}
            onChange={(time) => setFormData({ ...formData, deptTime: time })}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="HH:mm"
            placeholderText="Select time"
            className="datepicker"
          />
        </div>

        <div className="form-group">
          <label>Arrival Time</label>
          <DatePicker
            selected={formData.arrivalTime}
            onChange={(time) => setFormData({ ...formData, arrivalTime: time })}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="HH:mm"
            placeholderText="Select time"
            className="datepicker"
          />
        </div>

        <div className="form-group">
          <label>Duration Hour</label>
          <input
            type="number"
            name="duration_hour"
            value={formData.duration_hour}
            onChange={handleChange}
          />
        </div>
        <div className="button-group">
          <button
            type="button"
            className="predict"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict Price"}
          </button>
          <button type="button" className="reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>

      {prediction !== null && (
        <div className="prediction">
          Predicted Price: ₹{prediction.toFixed(2)}
        </div>
      )}
    </div>
  );
};

export default FlightPricePredictor;
