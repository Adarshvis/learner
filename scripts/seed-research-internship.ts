import 'dotenv/config'
// @ts-nocheck
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function seedResearchInternship() {
  const payload = await getPayload({ config })

  console.log('Creating Research Internship program...')

  // Delete existing Research Internship if it exists
  const existing = await payload.find({
    collection: 'work-with-us',
    where: {
      slug: {
        equals: 'research-internship',
      },
    },
  })

  for (const program of existing.docs) {
    await payload.delete({
      collection: 'work-with-us',
      id: program.id,
    })
  }

  console.log('Deleted existing Research Internship')

  // Create Research Internship with problem domains
  const researchInternship = {
    title: 'Research Internship',
    slug: 'research-internship',
    excerpt: 'Through hands-on project experience and expert mentorship, our internship programme enables students and scholars to apply advanced concepts to real-world challenges and contribute to Cyber-Physical Systems innovations.',
    effectiveDate: 'Last Updated: December 2025',
    status: 'active',
    content: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: '1. Program Overview' }]
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Applications are open for a 5-month internship program. We help our interns develop data-backed research aptitude toward new and exciting domains in cyber-physical systems.'
              }
            ]
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: '2. Program Details' }]
          },
          {
            type: 'list',
            listType: 'bullet',
            children: [
              {
                type: 'listitem',
                indent: 0,
                value: 1,
                children: [
                  {
                    type: 'paragraph',
                    children: [{ type: 'text', text: 'Duration: 5 months' }]
                  }
                ]
              },
              {
                type: 'listitem',
                indent: 0,
                value: 2,
                children: [
                  {
                    type: 'paragraph',
                    children: [{ type: 'text', text: 'Monthly Stipend: INR 10,000' }]
                  }
                ]
              },
              {
                type: 'listitem',
                indent: 0,
                value: 3,
                children: [
                  {
                    type: 'paragraph',
                    children: [{ type: 'text', text: 'Minimum Attendance: 100 days in lab (mandatory)' }]
                  }
                ]
              },
              {
                type: 'listitem',
                indent: 0,
                value: 4,
                children: [
                  {
                    type: 'paragraph',
                    children: [{ type: 'text', text: 'Open to: Undergraduate, Postgraduate students, and Research Scholars' }]
                  }
                ]
              },
              {
                type: 'listitem',
                indent: 0,
                value: 5,
                children: [
                  {
                    type: 'paragraph',
                    children: [{ type: 'text', text: 'Note: No TA/DA shall be paid to candidates' }]
                  }
                ]
              }
            ]
          },
          {
            type: 'heading',
            tag: 'h2',
            children: [{ type: 'text', text: '3. Selection Process' }]
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Though we accept applications all year round, the selection timing is dynamic based on ongoing research requirements in our lab. The selection process consists of 6 steps:'
              }
            ]
          },
          {
            type: 'list',
            listType: 'number',
            children: [
              {
                type: 'listitem',
                indent: 0,
                value: 1,
                children: [
                  {
                    type: 'paragraph',
                    children: [{ type: 'text', text: 'Fill Application Form - Provide all required details for the desired position' }]
                  }
                ]
              },
              {
                type: 'listitem',
                indent: 0,
                value: 2,
                children: [
                  {
                    type: 'paragraph',
                    children: [{ type: 'text', text: 'Scrutiny of Application - We shortlist applications after thorough checks for the most suitable candidates' }]
                  }
                ]
              },
              {
                type: 'listitem',
                indent: 0,
                value: 3,
                children: [
                  {
                    type: 'paragraph',
                    children: [{ type: 'text', text: 'Complete Test/Assignment - A test or assignment is given for evaluation' }]
                  }
                ]
              },
              {
                type: 'listitem',
                indent: 0,
                value: 4,
                children: [
                  {
                    type: 'paragraph',
                    children: [{ type: 'text', text: 'Give the Interview - Shortlisted candidates attend personal interviews' }]
                  }
                ]
              },
              {
                type: 'listitem',
                indent: 0,
                value: 5,
                children: [
                  {
                    type: 'paragraph',
                    children: [{ type: 'text', text: 'Provide Documents - Selected candidates provide proof documents for identity verification' }]
                  }
                ]
              },
              {
                type: 'listitem',
                indent: 0,
                value: 6,
                children: [
                  {
                    type: 'paragraph',
                    children: [{ type: 'text', text: 'Final Decision - Results are communicated to verified candidates' }]
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    problemDomains: [
      {
        title: 'ML/DL Based Systems for Education 4.0 Applications',
        description: 'Education 4.0 is a technique of learning that is connected with the fourth industrial revolution and focuses on transforming the future of education through advanced technology and automation. Smart technology, artificial intelligence and robotics are part of this industrial revolution. Extensive amounts of data gathered from educational setups need to be analyzed using intelligent data analysis (IDA) methods. Smart assistants and support systems need to be developed using such data through advanced techniques of machine learning.',
        challenges: [
          { challenge: 'Use traditional data science and analysis techniques on education-related data' },
          { challenge: 'Design and implement new techniques for the interpretation of data gathered from live educational environments' },
        ],
        technicalSkills: [
          { skill: 'Programming Languages – Python / JavaScript / MATLAB' },
          { skill: 'Libraries – Numpy / Pandas / Tensorflow / Tensorflow.js / PyTorch / Scikit-learn' },
        ],
        nonTechnicalSkills: [
          { skill: 'Good Quantitative Aptitude' },
          { skill: 'Good Qualitative Aptitude' },
        ],
      },
      {
        title: 'Next-Gen Apps: Where Kotlin Meets MLOps Mastery',
        description: 'Modern application development requires seamless integration of machine learning capabilities with robust mobile platforms. This domain focuses on leveraging Kotlin for Android development while implementing MLOps practices for deploying, monitoring, and maintaining ML models in production environments.',
        challenges: [
          { challenge: 'Develop Android applications using Kotlin with integrated ML models' },
          { challenge: 'Implement CI/CD pipelines for ML model deployment' },
          { challenge: 'Create efficient model serving architectures for mobile platforms' },
        ],
        technicalSkills: [
          { skill: 'Kotlin programming language' },
          { skill: 'Android SDK and Jetpack libraries' },
          { skill: 'TensorFlow Lite / ML Kit' },
          { skill: 'Docker and Kubernetes for containerization' },
          { skill: 'MLOps tools (MLflow, Kubeflow)' },
        ],
        nonTechnicalSkills: [
          { skill: 'Problem-solving abilities' },
          { skill: 'Attention to detail in code quality' },
        ],
      },
      {
        title: 'Transforming Voices: NLP for Under-Represented Languages',
        description: 'Natural Language Processing has made tremendous strides in major languages, but under-represented languages lack adequate tools and resources. This domain focuses on developing NLP models, datasets, and applications for languages with limited digital presence, ensuring linguistic diversity in AI.',
        challenges: [
          { challenge: 'Create labeled datasets for under-represented languages' },
          { challenge: 'Develop language-specific tokenizers and embeddings' },
          { challenge: 'Build translation and transliteration systems' },
          { challenge: 'Implement speech-to-text and text-to-speech for regional languages' },
        ],
        technicalSkills: [
          { skill: 'Python and NLP libraries (NLTK, spaCy, Transformers)' },
          { skill: 'Deep learning frameworks (PyTorch, TensorFlow)' },
          { skill: 'Understanding of linguistic concepts' },
          { skill: 'Experience with pre-trained models (BERT, GPT variants)' },
        ],
        nonTechnicalSkills: [
          { skill: 'Cultural sensitivity and language awareness' },
          { skill: 'Research and documentation skills' },
        ],
      },
      {
        title: 'Visionary Healthcare: Transformative Computer Vision for Healthcare',
        description: 'Computer vision is revolutionizing healthcare through automated diagnosis, medical imaging analysis, and patient monitoring systems. This domain explores cutting-edge applications of deep learning for detecting diseases, analyzing radiology images, and developing assistive technologies for healthcare professionals.',
        challenges: [
          { challenge: 'Develop models for medical image classification (X-rays, MRIs, CT scans)' },
          { challenge: 'Implement object detection for identifying anomalies in medical images' },
          { challenge: 'Create segmentation models for tumor detection and organ analysis' },
          { challenge: 'Build real-time patient monitoring systems using computer vision' },
        ],
        technicalSkills: [
          { skill: 'Python with OpenCV and PIL/Pillow' },
          { skill: 'Deep learning frameworks (TensorFlow, PyTorch, Keras)' },
          { skill: 'CNN architectures (ResNet, U-Net, YOLO)' },
          { skill: 'Medical imaging formats (DICOM)' },
        ],
        nonTechnicalSkills: [
          { skill: 'Analytical thinking' },
          { skill: 'Ethical considerations in healthcare AI' },
        ],
      },
      {
        title: 'Data Analysis & Visualization',
        description: 'Transform raw data into meaningful insights through advanced statistical analysis and compelling visualizations. This domain covers exploratory data analysis, statistical modeling, interactive dashboards, and storytelling with data to support data-driven decision making.',
        challenges: [
          { challenge: 'Perform exploratory data analysis on complex datasets' },
          { challenge: 'Create interactive dashboards and visualizations' },
          { challenge: 'Implement statistical models for predictive analytics' },
          { challenge: 'Develop automated reporting systems' },
        ],
        technicalSkills: [
          { skill: 'Python (Pandas, NumPy, Matplotlib, Seaborn, Plotly)' },
          { skill: 'R programming for statistical analysis' },
          { skill: 'Data visualization tools (Tableau, Power BI, D3.js)' },
          { skill: 'SQL for database querying' },
          { skill: 'Jupyter Notebooks' },
        ],
        nonTechnicalSkills: [
          { skill: 'Strong analytical mindset' },
          { skill: 'Ability to communicate insights effectively' },
        ],
      },
      {
        title: 'E-Governance Framework/Software Development',
        description: 'Design and develop robust e-governance solutions that improve government service delivery, transparency, and citizen engagement. This domain focuses on building scalable web applications, APIs, and frameworks that facilitate digital transformation in public administration.',
        challenges: [
          { challenge: 'Develop citizen-centric web portals and mobile applications' },
          { challenge: 'Implement secure authentication and authorization systems' },
          { challenge: 'Create APIs for inter-departmental data exchange' },
          { challenge: 'Build complaint management and tracking systems' },
        ],
        technicalSkills: [
          { skill: 'Full-stack development (React, Node.js, Django, Flask)' },
          { skill: 'Database management (PostgreSQL, MongoDB)' },
          { skill: 'RESTful API design and development' },
          { skill: 'Cloud platforms (AWS, Azure, GCP)' },
          { skill: 'Security best practices (OAuth, JWT, encryption)' },
        ],
        nonTechnicalSkills: [
          { skill: 'Understanding of government processes' },
          { skill: 'User-centric design thinking' },
        ],
      },
      {
        title: 'AI Imagination Unleashed: Crafting with LLM and GAN',
        description: 'Explore the creative potential of generative AI through Large Language Models (LLMs) and Generative Adversarial Networks (GANs). This domain involves building applications that generate text, images, music, and other creative content, pushing the boundaries of AI-driven creativity.',
        challenges: [
          { challenge: 'Fine-tune LLMs for specific creative writing tasks' },
          { challenge: 'Develop GAN models for image synthesis and style transfer' },
          { challenge: 'Create applications combining multiple generative models' },
          { challenge: 'Implement prompt engineering techniques for better outputs' },
        ],
        technicalSkills: [
          { skill: 'Python with Transformers library (Hugging Face)' },
          { skill: 'PyTorch or TensorFlow for GANs' },
          { skill: 'Experience with GPT, DALL-E, Stable Diffusion' },
          { skill: 'Understanding of attention mechanisms and transformer architecture' },
          { skill: 'API integration (OpenAI, Anthropic)' },
        ],
        nonTechnicalSkills: [
          { skill: 'Creative thinking and experimentation' },
          { skill: 'Ethical awareness of generative AI implications' },
        ],
      },
    ],
    applyButtonText: 'Apply Now',
    applyButtonLink: 'https://www.forms.du.ac.in/mac/view.php?id=91536',
  }

  try {
    const program = await payload.create({
      collection: 'work-with-us',
      data: researchInternship,
    })
    console.log(`✓ Created: ${program.title} with ${researchInternship.problemDomains.length} problem domains`)
  } catch (error) {
    console.error('✗ Failed to create Research Internship:', error)
  }

  console.log('\n✅ Successfully seeded Research Internship program!')
  process.exit(0)
}

seedResearchInternship()
