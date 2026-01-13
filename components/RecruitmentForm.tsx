'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import SectionHeading from './SectionHeading'
import LoadingSpinner from './LoadingSpinner'

export default function RecruitmentForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    major: '',
    class: '',
    cv: null as File | null,
    motivationLetter: null as File | null,
    portfolio: null as File | null,
  })

  const [errors, setErrors] = useState({
    fullName: '',
    major: '',
    class: '',
    cv: '',
    motivationLetter: '',
    portfolio: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (files && files[0]) {
      const file = files[0]
      
      // Validate PDF
      if (file.type !== 'application/pdf') {
        setErrors((prev) => ({ ...prev, [name]: 'Only PDF files are allowed' }))
        return
      }

      setFormData((prev) => ({ ...prev, [name]: file }))
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {
      fullName: '',
      major: '',
      class: '',
      cv: '',
      motivationLetter: '',
      portfolio: '',
    }

    let isValid = true

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
      isValid = false
    }

    if (!formData.major.trim()) {
      newErrors.major = 'Major is required'
      isValid = false
    }

    if (!formData.class.trim()) {
      newErrors.class = 'Class is required'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Trigger confetti animation
      const count = 200
      const defaults = {
        origin: { y: 0.7 }
      }

      function fire(particleRatio: number, opts: confetti.Options) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        })
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      })
      fire(0.2, {
        spread: 60,
      })
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
      })
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
      })
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      })

      alert('Form submitted successfully! ✅\n\nWe will review your application and contact you soon.')
      
      // Reset form
      setFormData({
        fullName: '',
        major: '',
        class: '',
        cv: null,
        motivationLetter: null,
        portfolio: null,
      })
      
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <section className="py-20 px-4 relative glow-pink-bottom">
      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeading 
          eyebrow="Open Recruitment"
          title="Join the Lab Team" 
          subtitle="Open call for passionate students ready to lead, collaborate, and grow with us."
        />

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card-surface rounded-3xl overflow-hidden"
        >
          {/* Header Bar with Gradient */}
          <div className="bg-primary px-6 py-4">
            <h3 className="text-white font-semibold text-center">Fill Registration Form</h3>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <motion.div 
                className="md:col-span-2"
                whileFocus={{ scale: 1.01 }}
              >
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.fullName ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition bg-white`}
                  placeholder="Label"
                />
                {errors.fullName && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs mt-1"
                  >
                    {errors.fullName}
                  </motion.p>
                )}
              </motion.div>

              {/* Major */}
              <motion.div whileFocus={{ scale: 1.01 }}>
                <label htmlFor="major" className="block text-sm font-medium text-gray-700 mb-2">
                  Major <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="major"
                  name="major"
                  value={formData.major}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.major ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition bg-white`}
                  placeholder="Label"
                />
                {errors.major && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs mt-1"
                  >
                    {errors.major}
                  </motion.p>
                )}
              </motion.div>

              {/* Class */}
              <motion.div whileFocus={{ scale: 1.01 }}>
                <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-2">
                  Class <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="class"
                  name="class"
                  value={formData.class}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.class ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition bg-white`}
                  placeholder="Label"
                />
                {errors.class && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs mt-1"
                  >
                    {errors.class}
                  </motion.p>
                )}
              </motion.div>

              {/* CV Upload */}
              <div>
                <label htmlFor="cv" className="block text-sm font-medium text-gray-700 mb-2">CV (.pdf)</label>
                <input
                  type="file"
                  id="cv"
                  name="cv"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                />
                {errors.cv && (
                  <p className="text-red-500 text-xs mt-1">{errors.cv}</p>
                )}
                {formData.cv && (
                  <p className="text-green-600 text-xs mt-1">✓ {formData.cv.name}</p>
                )}
              </div>

              {/* Motivation Letter Upload */}
              <div>
                <label htmlFor="motivationLetter" className="block text-sm font-medium text-gray-700 mb-2">Motivation Letter (.pdf)</label>
                <input
                  type="file"
                  id="motivationLetter"
                  name="motivationLetter"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                />
                {errors.motivationLetter && (
                  <p className="text-red-500 text-xs mt-1">{errors.motivationLetter}</p>
                )}
                {formData.motivationLetter && (
                  <p className="text-green-600 text-xs mt-1">✓ {formData.motivationLetter.name}</p>
                )}
              </div>

              {/* Portfolio Upload */}
              <div className="md:col-span-2">
                <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-2">Portfolio (.pdf)</label>
                <input
                  type="file"
                  id="portfolio"
                  name="portfolio"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                />
                {errors.portfolio && (
                  <p className="text-red-500 text-xs mt-1">{errors.portfolio}</p>
                )}
                {formData.portfolio && (
                  <p className="text-green-600 text-xs mt-1">✓ {formData.portfolio.name}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-8">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary-dark disabled:bg-gray-400 text-white px-6 py-2.5 rounded-full font-semibold shadow-soft disabled:cursor-not-allowed transition-all relative overflow-hidden group"
                whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(109, 94, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit</span>
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </>
                  )}
                </span>
                {!isSubmitting && (
                  <motion.div
                    className="absolute inset-0 bg-accent-green"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
