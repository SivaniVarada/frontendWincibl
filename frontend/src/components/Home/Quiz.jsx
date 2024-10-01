import React, { useState, useEffect } from 'react';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function QuizSection() {
  return (
    <section className="my-36">
      <div className="bg-quiz-bg h-auto sm:bg-cover bg-center bg-no-repeat rounded-xl relative">
        <article className="py-24 md:px-14 px-4 md:w-9/12 md:mx-0 mx-auto md:text-left text-center leading-none">
          <h1 className="font-bold lg:text-[60px] text-[50px] text-white pb-8">
            Are you stuck in a helpless situation?
          </h1>
          <button className="capitalize bg-button-primary hover:bg-button-primary-hover transition-colors px-28 py-3 rounded-sm font-bold text-white mx-6"
                   >
            Click Here!
          </button>
          {/* <button className="capitalize bg-button-primary hover:bg-button-primary-hover transition-colors px-14 py-3 rounded-sm font-bold text-white"
                  onClick={handleEmergencyClick} disabled={isSending}>
            Emergency
          </button> */}
        </article>
      </div>
    </section>
  );
}

export default QuizSection;
