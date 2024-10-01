// pages/Depression.jsx
import React from "react";
import depressionImage from "../assets/random.png"; // Image for depression section
import techniquesImage from "../assets/random.png"; // Image for techniques section

const Depression = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Section 1: What is Depression? */}
      <section className="mb-10">
        <h1 className="text-4xl font-bold text-center mb-6">What is Depression?</h1>
        <img
          src={depressionImage}
          alt="Depression"
          className="w-full h-auto rounded-lg shadow-md mb-6"
        />
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Depression is a common and serious medical illness that negatively affects how you feel,
          the way you think, and how you act. It causes feelings of sadness or a loss of interest in
          activities once enjoyed. It can lead to various emotional and physical problems and can
          decrease a person's ability to function at work and at home.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Symptoms of depression can vary from mild to severe and include:
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-700">
          <li>Feeling sad or having a depressed mood</li>
          <li>Loss of interest or pleasure in activities once enjoyed</li>
          <li>Changes in appetite — weight loss or gain unrelated to dieting</li>
          <li>Trouble sleeping or sleeping too much</li>
          <li>Loss of energy or increased fatigue</li>
          <li>Feeling worthless or guilty</li>
          <li>Difficulty thinking, concentrating, or making decisions</li>
          <li>Thoughts of death or suicide</li>
        </ul>
        <p className="text-lg text-gray-700 leading-relaxed">
          Depression is treatable, and early intervention can significantly improve quality of life.
          If you or someone you know is experiencing symptoms of depression, it's important to seek
          professional help.
        </p>
      </section>

      {/* Section 2: Techniques to Overcome Depression */}
      <section>
        <h2 className="text-4xl font-bold text-center mb-6">Techniques to Overcome Depression</h2>
        <img
          src={techniquesImage}
          alt="Techniques to Overcome Depression"
          className="w-full h-auto rounded-lg shadow-md mb-6"
        />
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Overcoming depression takes time and effort, but there are proven techniques that can help
          reduce symptoms and improve overall well-being. Here are some effective strategies:
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-700">
          <li>
            <strong>Exercise:</strong> Regular physical activity can help reduce depression by
            releasing endorphins, chemicals in the brain that improve mood.
          </li>
          <li>
            <strong>Mindfulness and Meditation:</strong> Practicing mindfulness and meditation helps
            individuals focus on the present moment, reducing stress and anxiety.
          </li>
          <li>
            <strong>Therapy:</strong> Cognitive-behavioral therapy (CBT) and other forms of talk
            therapy can help people identify negative thought patterns and replace them with
            positive ones.
          </li>
          <li>
            <strong>Healthy Diet:</strong> Eating nutritious meals can have a positive impact on
            mood and overall well-being. Avoid excessive sugar and processed foods.
          </li>
          <li>
            <strong>Build a Support System:</strong> Surrounding yourself with friends, family, or
            support groups can help reduce the feelings of isolation that often accompany
            depression.
          </li>
          <li>
            <strong>Sleep Hygiene:</strong> Getting consistent, restful sleep is critical for mental
            health. Establish a regular sleep routine and avoid screens before bedtime.
          </li>
          <li>
            <strong>Engage in Hobbies:</strong> Participating in hobbies you enjoy, even when you
            don’t feel like it, can help improve mood and provide a sense of purpose.
          </li>
          <li>
            <strong>Limit Alcohol and Avoid Drugs:</strong> These substances can exacerbate
            depression, so it's important to avoid them if you're feeling down.
          </li>
        </ul>
        <p className="text-lg text-gray-700 leading-relaxed">
          It's important to remember that everyone’s journey with depression is different. If one
          method isn’t working, don’t give up—try another, and reach out for help when needed.
        </p>
      </section>
    </div>
  );
};

export default Depression;
