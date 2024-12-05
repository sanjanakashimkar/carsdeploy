import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  User,
  Fuel,
  Gauge,
  ZoomIn,
  Shield,
  Award,
  Share2,
  X,
  Link,
} from 'lucide-react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

function CarsData() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showZoomModal, setShowZoomModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const params = useParams();

  useEffect(() => {
    fetchCarDetails();
  }, [params?.id]);

  // Fetch car details from API
  const fetchCarDetails = async () => {
    try {
      const response = await fetch(
        `http://3.7.253.196:3000/api/cars/cars/${params?.id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) throw new Error('Failed to fetch car details');
      const dataResponse = await response.json();
      setData(dataResponse);
    } catch (error) {
      console.error('Error fetching car details:', error);
    } finally {
      setLoading(false);
    }
  };

  // Image navigation functions
  function nextImage() {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % data.images.length);
  }

  function prevImage() {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + data.images.length) % data.images.length);
  }

  // Toggle modal visibility
  function toggleZoomModal() {
    setShowZoomModal((prev) => !prev);
  }

  function toggleShareModal() {
    setShowShareModal((prev) => !prev);
  }

  const shareUrl = `${window.location.origin}/cars/${data?._id}`;

  const shareOptions = [
    {
      label: 'WhatsApp',
      action: () => window.open(`https://wa.me/?text=${encodeURIComponent(shareUrl)}`, '_blank'),
      icon: <FaWhatsapp />,
      style: 'bg-green-500 text-white',
    },
    {
      label: 'Copy Link',
      action: () => {
        navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
      },
      icon: <Link />,
      style: 'bg-gray-200 text-gray-800',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-orange-50">
        <motion.div
          className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-orange-50">
        <p className="text-2xl text-gray-600">No car data available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-orange-50 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="md:flex">
          <div className="md:w-1/2 p-4">
            {/* Image Carousel */}
            <div className="relative h-64 sm:h-80 md:h-96 mb-4">
              <img
                src={data.images[currentImageIndex].url}
                alt={`${data.carName} - View ${currentImageIndex + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <button onClick={prevImage} className="absolute left-2 top-1/2 bg-gray-200 p-2">
                <ChevronLeft />
              </button>
              <button onClick={nextImage} className="absolute right-2 top-1/2 bg-gray-200 p-2">
                <ChevronRight />
              </button>
            </div>
          </div>

          <div className="md:w-1/2 p-8">
            <h2 className="text-4xl font-bold">{data.carName}</h2>
            <p>{data.brand} | {data.year}</p>
            <p>{data.price}</p>

            <div>
              <h3 className="text-xl">Description</h3>
              <p>{showFullDescription ? data.description : `${data.description.slice(0, 150)}...`}</p>
              <button onClick={() => setShowFullDescription((prev) => !prev)}>
                {showFullDescription ? 'Read less' : 'Read more'}
              </button>
            </div>

            {/* Modals */}
            {showZoomModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50">
                <img src={data.images[currentImageIndex].url} alt="Zoom" />
                <button onClick={toggleZoomModal}>Close</button>
              </div>
            )}

            {showShareModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50">
                <div>
                  {shareOptions.map(({ label, action, icon, style }) => (
                    <button key={label} onClick={action} className={style}>
                      {icon} {label}
                    </button>
                  ))}
                  <button onClick={toggleShareModal}>Close</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default CarsData;
