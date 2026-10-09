import React, { useState, useEffect, useRef } from 'react'
import coupleTraditional from './assets/couple-traditional.jpg'
import coupleReception from './assets/couple-reception.jpg'
import coupleParty from './assets/couple-party.jpg'
import mapPreview from './assets/map-preview.png'
import floralCornerImage from './assets/floral-corner-white-bg.png'
import flowerRing from './assets/flower-ring.png'
import { MapPin, Compass, Calendar, Navigation, Moon, Heart, Volume2, VolumeX, Sun, Sparkles, Clock } from 'lucide-react'
import './App.css'

function App() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isFlipped, setIsFlipped] = useState(false)
  const audioRef = useRef(null)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)

  // Flying beige hearts state & observer
  const [showBeigeHearts, setShowBeigeHearts] = useState(false)
  const footerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowBeigeHearts(true)
        }
      },
      { threshold: 0.1 }
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current)
    }
  }, [])

  // Target date: October 25, 2026 9:00 AM (Muhurtham Start)
  const targetDate = new Date('2026-10-25T09:00:00')

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Initialize Audio Player from 0:05 on loop
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedMetadata = () => {
      if (audio.currentTime < 5) {
        audio.currentTime = 5
      }
    }

    const handleEnded = () => {
      audio.currentTime = 5
      audio.play().then(() => setIsAudioPlaying(true)).catch(() => {})
    }

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)

    // Attempt autoplay from 5 seconds
    audio.currentTime = 5
    audio.play()
      .then(() => setIsAudioPlaying(true))
      .catch(() => {
        // Autoplay policy prevented playback until user interaction
        setIsAudioPlaying(false)
      })

    // Play on first user click/touch gesture anywhere on screen
    const handleGesture = () => {
      if (audio.paused) {
        if (audio.currentTime < 5) audio.currentTime = 5
        audio.play().then(() => setIsAudioPlaying(true)).catch(() => {})
      }
      window.removeEventListener('click', handleGesture)
      window.removeEventListener('touchstart', handleGesture)
    }

    window.addEventListener('click', handleGesture)
    window.addEventListener('touchstart', handleGesture)

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleEnded)
      window.removeEventListener('click', handleGesture)
      window.removeEventListener('touchstart', handleGesture)
    }
  }, [])

  const toggleAudio = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isAudioPlaying) {
      audio.pause()
      setIsAudioPlaying(false)
    } else {
      if (audio.currentTime < 5) {
        audio.currentTime = 5
      }
      audio.play()
        .then(() => setIsAudioPlaying(true))
        .catch(err => console.log("Audio play error:", err))
    }
  }

  const addToCalendar = (eventType = 'muhurtham') => {
    let title, startTime, endTime, details
    if (eventType === 'muhurtham') {
      title = encodeURIComponent("Niranjan & Cynthia - Muhurtham")
      startTime = "20261025T090000"
      endTime = "20261025T103000"
      details = encodeURIComponent("Join us for the auspicious Muhurtham ceremony of Niranjan & Cynthia!\n\nLocation: Palace House, Injambakkam, Chennai - 600115")
    } else {
      title = encodeURIComponent("Niranjan & Cynthia - Reception")
      startTime = "20261025T180000"
      endTime = "20261025T220000"
      details = encodeURIComponent("Join us to celebrate the Grand Reception of Niranjan & Cynthia!\n\nLocation: Palace House, Injambakkam, Chennai - 600115")
    }

    const location = encodeURIComponent("Palace House, Injambakkam, Chennai - 600115")
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`

    window.open(googleCalendarUrl, '_blank')
  }

  return (
    <div className="app-container">
      {/* HTML5 Audio Player */}
      <audio ref={audioRef} src="/music cut.mpeg" preload="auto" />

      {/* Background Elements */}
      <div className="bg-layers">
        <div className="bg-layer-left"></div>
        <div className="bg-layer-bottom"></div>
        <div className="bg-layer-top"></div>
      </div>

      {/* Floral Corner Decoration */}
      <img src={floralCornerImage} alt="Floral Decoration" className="floral-corner-top-left" />

      {/* Navigation / Header */}
      <nav className="navbar">
        <div className="nav-brand">
          <div className="brand-line">
            <span className="brand-text">Wedding Celebration</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">

        {/* Blessings Section */}
        <div className="blessings-section">
          <p className="blessings-label">With the blessings of</p>
          <div className="blessings-names">
            <p>Our Loving Families</p>
            <p className="ampersand">&</p>
            <p>Friends</p>
          </div>
        </div>

        {/* Central Image Circle */}
        <div className="hero-image-container" onClick={() => setIsFlipped(!isFlipped)}>
          {/* Decorative Circles */}
          <div className="circle-back"></div>
          <div className="circle-border"></div>

          {/* Flip Card Structure */}
          <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
            {/* Front Face */}
            <div className="flip-card-front">
              <img
                src={coupleTraditional}
                alt="Niranjan and Cynthia"
                className="couple-photo"
              />
            </div>

            {/* Back Face */}
            <div className="flip-card-back">
              <div className="back-content">
                <p className="back-name">Niranjan</p>
                <div className="heart-icon-wrapper">
                  <Heart size={28} fill="#e11d48" color="#e11d48" className="pulsing-heart" />
                  {/* Burst Particles */}
                  <span className="heart-particle p1">❤</span>
                  <span className="heart-particle p2">❤</span>
                  <span className="heart-particle p3">❤</span>
                  <span className="heart-particle p4">❤</span>
                  <span className="heart-particle p5">❤</span>
                  <span className="heart-particle p6">❤</span>
                </div>
                <p className="back-name">Cynthia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Engagement / Wedding Text */}
        <div className="engagement-text-section">
          <p className="engagement-label">Wedding Celebration</p>
          <h1 className="couple-names">
            Niranjan <span className="name-ampersand">&</span> Cynthia
          </h1>
        </div>

        {/* Save The Date Divider */}
        <div className="save-date-divider">
          <div className="line"></div>
          <span className="save-date-text">Save the Date</span>
          <div className="line"></div>
        </div>

        {/* Countdown Timer */}
        <div className="countdown-container">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Mins', value: timeLeft.minutes },
            { label: 'Secs', value: timeLeft.seconds }
          ].map((item) => (
            <div key={item.label} className="timer-item">
              <div className="timer-value">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="timer-label">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Events Schedule Section: Separate Cards for Muhurtham & Reception */}
        <h2 className="events-section-title">Events Schedule</h2>
        <div className="events-grid">
          {/* Muhurtham Card */}
          <div className="event-card">
            <div>
              <div className="event-header">
                <span className="event-card-tag">Auspicious Ceremony</span>
                <Sun size={20} color="#bfa05f" />
              </div>
              <h2 className="event-card-title">Muhurtham</h2>
              <p className="event-card-date">Sunday, 25th October 2026</p>
              <div className="event-card-time">
                <Clock size={16} /> 9:00 AM — 10:30 AM
              </div>
              <p className="event-card-venue">
                <strong>Palace House</strong><br />
                Injambakkam, Chennai - 600115
              </p>
            </div>
            <div className="event-card-action">
              <button className="btn-outline add-cal-btn" onClick={() => addToCalendar('muhurtham')}>
                <Calendar size={14} />
                Add Muhurtham to Calendar
              </button>
            </div>
          </div>

          {/* Reception Card */}
          <div className="event-card">
            <div>
              <div className="event-header">
                <span className="event-card-tag">Grand Evening</span>
                <Sparkles size={20} color="#bfa05f" />
              </div>
              <h2 className="event-card-title">Reception</h2>
              <p className="event-card-date">Sunday, 25th October 2026</p>
              <div className="event-card-time">
                <Clock size={16} /> 6:00 PM Onwards
              </div>
              <p className="event-card-venue">
                <strong>Palace House</strong><br />
                Injambakkam, Chennai - 600115
              </p>
            </div>
            <div className="event-card-action">
              <button className="btn-outline add-cal-btn" onClick={() => addToCalendar('reception')}>
                <Calendar size={14} />
                Add Reception to Calendar
              </button>
            </div>
          </div>
        </div>

        {/* Details Card: Calendar & Location */}
        <div className="details-card">
          <div className="details-content">
            {/* Calendar Column */}
            <div className="detail-block when-block">
              <div className="when-content-wrapper">
                <div className="when-text-side">
                  <span className="detail-label">Event Date</span>
                  <h2 className="detail-title">Sunday</h2>
                  <h2 className="detail-title">25th Oct 2026</h2>
                  <p className="detail-note">Save the date for our big day!</p>
                </div>

                <div className="when-calendar-side">
                  <div className="mini-calendar-widget">
                    <div className="calendar-header">OCTOBER 2026</div>
                    <div className="calendar-grid">
                      <span className="day-name">S</span>
                      <span className="day-name">M</span>
                      <span className="day-name">T</span>
                      <span className="day-name">W</span>
                      <span className="day-name">T</span>
                      <span className="day-name">F</span>
                      <span className="day-name">S</span>
                      <span className="empty-day"></span>
                      <span className="empty-day"></span>
                      <span className="empty-day"></span>
                      <span className="empty-day"></span>
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                        <span
                          key={day}
                          className={`calendar-day ${day === 25 ? 'highlight-day' : ''}`}
                        >
                          {day}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Venue & Location Column */}
            <div className="detail-block">
              <div className="where-content-wrapper">
                <div className="where-text-side">
                  <span className="detail-label">Venue Location</span>
                  <h2 className="detail-title">Palace House</h2>
                  <p className="detail-text">Injambakkam, Chennai - 600115</p>

                  <a
                    href="https://maps.app.goo.gl/6wwidqBGCGow2UCL6?g_st=ac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-direction-btn"
                  >
                    <Navigation size={16} />
                    Map Direction
                  </a>

                  <div className="valet-parking">
                    <span className="valet-icon">P</span> Valet Parking Available
                  </div>
                </div>

                <a
                  href="https://maps.app.goo.gl/6wwidqBGCGow2UCL6?g_st=ac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="where-map-side"
                >
                  <img src={mapPreview} alt="Map Location" className="map-preview-img" />
                </a>
              </div>
            </div>
          </div>
        </div>


        {/* Featured Photo Section */}
        <div className="illustration-section">
          <div className="illustration-wrapper">
            <img src={coupleReception} alt="Niranjan & Cynthia" className="cartoon-img" />
            <img src={flowerRing} alt="" className="cartoon-frame" />
          </div>
          <p className="illustration-caption">Can't wait to celebrate with you!</p>
        </div>

        {/* Footer */}
        <footer className="footer" ref={footerRef}>
          <div className="footer-logo">N & C</div>
        </footer>

      </main>

      {/* Flying Beige Hearts at Footer */}
      {showBeigeHearts && (
        <div className="footer-hearts-container">
          {[
            { left: '6%', delay: '0s', size: '14px' },
            { left: '16%', delay: '1.2s', size: '18px' },
            { left: '26%', delay: '0.4s', size: '12px' },
            { left: '36%', delay: '2.1s', size: '16px' },
            { left: '46%', delay: '0.8s', size: '20px' },
            { left: '56%', delay: '2.5s', size: '14px' },
            { left: '66%', delay: '1.5s', size: '18px' },
            { left: '76%', delay: '0.3s', size: '12px' },
            { left: '86%', delay: '1.8s', size: '16px' },
            { left: '94%', delay: '2.7s', size: '14px' },
          ].map((h, i) => (
            <span
              key={i}
              className="beige-heart"
              style={{
                left: h.left,
                animationDelay: h.delay,
                fontSize: h.size
              }}
            >
              ❤
            </span>
          ))}
        </div>
      )}

      {/* Decorative vertical line left */}
      <div className="vertical-line"></div>
    </div>
  )
}

export default App
