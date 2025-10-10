import { useState } from "react";

export default function PostCaption({ caption, more = false }) {
    const [showMore, setShowMore] = useState(more);

    const words = caption?.split(" ") || [];
    const captionSize = words.length > 22;
    const shortCaption = captionSize
        ? words.slice(0, 22).join(" ") + "..."
        : caption;
    return (
        <div className="px-3 mt-2">
            <p className="text-sm">
                <span className="font-semibold">
                    {showMore ? caption : shortCaption}
                </span>

                {captionSize && (
                    <button
                        onClick={() => setShowMore(!showMore)}
                        className="text-gray-500 text-sm"
                        hidden={more}
                    >
                        ...see {!showMore ? "more" : "less"}
                    </button>
                )}
            </p>
        </div>
    );
}
