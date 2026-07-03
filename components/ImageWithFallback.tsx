"use client"
import React, { useState, useEffect } from 'react'
import Image, { ImageProps } from 'next/image'

interface ImageWithFallbackProps extends ImageProps {
    fallback?: string;
}

export default function ImageWithFallback({ src, fallback, alt, ...props }: ImageWithFallbackProps) {
    const [error, setError] = useState(false)

    useEffect(() => {
        setError(false)
    }, [src])

    const fallbackSrc = fallback || (typeof src === 'string' && src.endsWith('.avif') ? src.replace(/\.avif$/, '.webp') : src)

    return (
        <Image
            alt={alt}
            src={error ? fallbackSrc : src}
            onError={() => setError(true)}
            {...props}
        />
    )
}
