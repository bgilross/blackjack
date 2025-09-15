import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { useBlackjackContext } from "../utils/BlackjackContext"

const DealAnimationLayer = () => {
	const { animationRequest, resolveAnimation } = useBlackjackContext()
	const [animating, setAnimating] = useState(null)
	const [started, setStarted] = useState(false)

	useEffect(() => {
		if (!animationRequest) return

		const { from, to, img, duration = 350 } = animationRequest

		const fromEl = document.querySelector(from)
		const toEl = document.querySelector(to)
		if (!fromEl || !toEl) {
			// Nothing to animate; resolve immediately
			resolveAnimation()
			return
		}

		const fromRect = fromEl.getBoundingClientRect()
		const toRect = toEl.getBoundingClientRect()

		const start = {
			x: fromRect.left + fromRect.width / 2,
			y: fromRect.top + fromRect.height / 2,
		}
		const end = {
			x: toRect.left + toRect.width / 2,
			y: toRect.top + toRect.height / 2,
		}
		const dx = end.x - start.x
		const dy = end.y - start.y

		setAnimating({ img, start, dx, dy, duration })
		setStarted(false)

		// trigger the transform in the next frame to allow CSS transition
		const raf = requestAnimationFrame(() => setStarted(true))

		const timeout = setTimeout(() => {
			resolveAnimation()
			setAnimating(null)
			setStarted(false)
			cancelAnimationFrame(raf)
		}, duration + 30)

		return () => clearTimeout(timeout)
	}, [animationRequest, resolveAnimation])

	if (!animating) return null

	// Render in portal to body to avoid overflow clipping
	return createPortal(
		<div
			className="deal-animation-layer"
			style={{ pointerEvents: "none" }}
		>
			<img
				src={animating.img}
				alt="deal"
				className="deal-card"
				style={{
					position: "fixed",
					left: animating.start.x - 5 + "px",
					top: animating.start.y - 5 + "px",
					width: "10rem",
					height: "15rem",
					transform: started
						? `translate(${animating.dx}px, ${animating.dy}px)`
						: `translate(0px, 0px)`,
					transition: `transform ${animating.duration}ms ease-in-out, opacity 120ms`,
				}}
			/>
		</div>,
		document.body
	)
}

export default DealAnimationLayer
