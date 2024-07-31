import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
const localURL = "http://localhost:3001/reviews"
const URL = ""

const TemplateRatingsChart = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTemplateRatings = async () => {
            try {
                const response = await axios.get(`${URL || localURL}/template-ratings`);
                const data = response.data;

                if (!Array.isArray(data)) {
                    throw new Error("Response data is not an array");
                }

                const templateNames = data.map(template => template.templateName);
                const averageRatings = data.map(template => parseFloat(template.averageRating));

                setChartData({
                    labels: templateNames,
                    datasets: [
                        {
                            label: 'Average Rating',
                            data: averageRatings,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        }
                    ]
                });
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchTemplateRatings();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='w-[800px]'>
            <h2 className='text-[16px] text-gray-700'>Template Average Ratings</h2>
            <Bar data={chartData} />
        </div>
    );
};

export default TemplateRatingsChart;
