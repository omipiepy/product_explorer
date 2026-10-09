import { useState } from "react";

const ImageCollect = ({ images, title }) => {
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <div className="aspect-square bg-gray-100">
        <img
          src={images[selected]}
          alt={`${title}, image ${selected + 1} of ${images.length}`}
          width="600"
          height="600"
          className="h-full w-full object-contain"
        />
      </div>

      <ul className="mt-4 flex flex-wrap gap-2">
        {images.map((image, index) => (
          <li key={image}>
            <button
              onClick={() => setSelected(index)}
              aria-label={`Show image ${index + 1}`}
              aria-current={index === selected}
              className={`h-16 w-16 rounded border-2 bg-gray-100 ${
                index === selected ? "border-indigo-600" : "border-transparent"
              }`}
            >
              <img
                src={image}
                alt=""
                width="64"
                height="64"
                className="h-full w-full object-contain"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ImageCollect;