import { Button } from 'flowbite-react';
import React from 'react';

function MoreProject() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-3">
      {/* Card 1 */}
      <div className="flex flex-col border border-teal-500 rounded-tl-3xl rounded-br-3xl p-3">
        <div className="flex-1 flex flex-col">
          <h2 className="text-2xl">Want to learn more about React js?</h2>
          <p className="text-gray-500 my-2">
            Checkout these resources with Our React js Projects
          </p>
          <Button gradientDuoTone="purpleToPink" className="rounded-tl-xl rounded-bl-none">
            <a href="https://github.com/Ayush-Anshuli" target="_blank" rel="noopener noreferrer">
              Learn More
            </a>
          </Button>
        </div>
        <div className="p-7">
          <img
            src="https://qualitythought.in/wp-content/uploads/2024/08/the_future_of_web_development_reactjs.webp"
            alt="JavaScript Introduction"
          />
        </div>
      </div>

      {/* Card 2 */}
      <div className="flex flex-col border border-teal-500 rounded-tl-3xl rounded-br-3xl p-3">
        <div className="flex-1 flex flex-col">
          <h2 className="text-2xl">Want to learn more about AI?</h2>
          <p className="text-gray-500 my-2">
            Checkout these resources with Our AI Projects
          </p>
          <Button gradientDuoTone="purpleToPink" className="rounded-tl-xl rounded-bl-none">
            <a href="https://github.com/Ayush-Anshuli" target="_blank" rel="noopener noreferrer">
              Learn More
            </a>
          </Button>
        </div>
        <div className="p-7">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4GQuewxLfMh2olMxwVIVsJmu1qFf5Q4dwZw&s"
            alt="JavaScript Introduction"
          />
        </div>
      </div>

      {/* Card 3 */}
      <div className="flex flex-col border border-teal-500 rounded-tl-3xl rounded-br-3xl p-3">
        <div className="flex-1 flex flex-col">
          <h2 className="text-2xl">Want to learn more about ML?</h2>
          <p className="text-gray-500 my-2">
            Checkout these resources with Our ML Projects
          </p>
          <Button gradientDuoTone="purpleToPink" className="rounded-tl-xl rounded-bl-none">
            <a href="https://github.com/Ayush-Anshuli" target="_blank" rel="noopener noreferrer">
              Learn More
            </a>
          </Button>
        </div>
        <div className="p-7">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkD1SCydBqqftgAp-C-76EEEU0Wysqn6Ynpw&s"
            alt="JavaScript Introduction"
          />
        </div>
      </div>

      {/* Card 4 */}
      <div className="flex flex-col border border-teal-500 rounded-tl-3xl rounded-br-3xl p-3">
        <div className="flex-1 flex flex-col">
          <h2 className="text-2xl">Want to learn more about Web Development?</h2>
          <p className="text-gray-500 my-2">
            Checkout these resources with Our Web Development Projects
          </p>
          <Button gradientDuoTone="purpleToPink" className="rounded-tl-xl rounded-bl-none">
            <a href="https://github.com/Ayush-Anshuli" target="_blank" rel="noopener noreferrer">
              Learn More
            </a>
          </Button>
        </div>
        <div className="p-7">
          <img
            src="https://miro.medium.com/v2/resize:fit:1200/1*V-Jp13LvtVc2IiY2fp4qYw.jpeg"
            alt="JavaScript Introduction"
          />
        </div>
      </div>
    </div>
  );
}

export default MoreProject;
