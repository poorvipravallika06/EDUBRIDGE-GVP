// Multi-language Mentor Response System
export const getMockMentorResponse = (message: string, language: string): string => {
  const lowerMessage = message.toLowerCase();
  const isTamil = language.toLowerCase() === 'tamil';
  const isHindi = language.toLowerCase() === 'hindi';
  const isSpanish = language.toLowerCase() === 'spanish';
  const isFrench = language.toLowerCase() === 'french';
  const isTelugu = language.toLowerCase() === 'telugu';
  
  // TAMIL RESPONSES
  if (isTamil) {
    if (lowerMessage.includes('data science')) {
      return `**தரவு அறிவியல்** - முழு வழிகாட்டல்:

**அடிப்படைகள்**: புள்ளியியல், நிகழ்தகவு, நேரியல் இயற்கணிதம்
**நிரல்களுக்கு**: பைதான் (Pandas, NumPy, Scikit-learn), SQL
**காட்சி**: Matplotlib, Seaborn, Plotly
**ML**: பின்னடைவு, வகைப்பாடு, தொகுப்பு
**திட்ட திறன்கள்**: பண்பு பொறியியல், மாதிரி தேர்வு
**பயிற்சி**: Kaggle போட்டிகள், உண்மையான தரவுத்தொகுப்புகள்`;
    }
    if (lowerMessage.includes('python')) {
      return `**பைதான் நிரல்படுத்தல் மொழி**:

• **அடிப்படைகள்**: தொடரியல், தரவு வகைகள், செயல்பாடுகள், சுழல்கள்
• **நூலகங்கள்**: Pandas, NumPy, Matplotlib, Django, Flask
• **பயிற்சி**: HackerRank, LeetCode, CodeSignal
• **பணிகள்**: தரவு பகுப்பாய்வு, வலை பயன்பாடுகள், தன்னியக்க குறிப்புகள்
• **OOP**: வகுப்புகள், பொருள்கள், உத்தரதிகாரம், பல்வேறுபாடு`;
    }
    if (lowerMessage.includes('career') || lowerMessage.includes('job')) {
      return `**வேலை வழிகாட்டல்** - தொழில்நுட்ப தொழில்:

**தயாரிப்பு**: DSA, System Design, திட்டங்கள், பதிவு
**தொழில்நுட்ப**: நிரல்பாடு, DS&A, சிக்கல் தீர்ப்பு
**System Design**: கட்டமைப்பு, அளவிடுதல்
**சுய விள்ளம்**: தொழில்பாட சாதனைகளை முன்னிலைப்படுத்தவும்
**நெட்வொர்க்**: LinkedIn, GitHub, நிகழ்வுகள்`;
    }
    if (lowerMessage.includes('interview')) {
      return `**நேர்காணல் தயாரிப்பு** - முழு வழிகாட்டல்:

**நிரல்பாடு**: LeetCode, CodeForces (150+ சிக்கல்கள்)
**DS&A**: வரிசைகள், சரங்கள், மரங்கள், வரைபடங்கள்
**System Design**: அளவிடக்கூடிய அமைப்புகளை வடிவமைக்கவும்
**நடத்தை**: STAR முறை, குழு அபிজ்ஞன்ம
**பயிற்சி**: போலி நேர்காணல்கள், சகபாटी பயிற்சி`;
    }
    return `**கல்வி உள்ளடக்க உதவி** - தமிழ்:

நான் உங்களுக்கு உதவ முடியும்:

• **நிரல்களுக்கு**: பைதான், ஜாவா, C++, JavaScript, SQL
• **தரவு அறிவியல்**: Pandas, NumPy, ML, Deep Learning
• **வலை வளர்ச்சி**: HTML/CSS, React, Node.js
• **கணினி அறிவியல்**: DSA, DBMS, OS, System Design
• **வேலை**: நேர்காணல் தயாரிப்பு, சுய விள்ளம், நெட்வொர்க்

உங்கள் குறிப்பிட்ட கேள்வியைக் கேளுங்கள்!`;
  }
  
  // HINDI RESPONSES
  if (isHindi) {
    if (lowerMessage.includes('data science')) {
      return `**डेटा साइंस** - संपूर्ण रोडमैप:

**नींव**: सांख्यिकी, संभावना, रैखिक बीजगणित
**प्रोग्रामिंग**: पायथन (Pandas, NumPy, Scikit-learn), SQL
**विज़ुअलाइज़ेशन**: Matplotlib, Seaborn, Plotly
**ML**: प्रतिगमन, वर्गीकरण, क्लस्टरिंग
**कौशल**: फीचर इंजीनियरिंग, मॉडल चयन
**अभ्यास**: Kaggle प्रतियोगिताएं, वास्तविक डेटासेट`;
    }
    if (lowerMessage.includes('career') || lowerMessage.includes('job')) {
      return `**करियर मार्गदर्शन** - तकनीकी उद्योग:

**तैयारी**: DSA, System Design, प्रोजेक्ट्स, रिज्यूमे
**साक्षात्कार**: कोडिंग, समस्या समाधान, डिजाइन
**कौशल**: Java, Python, JavaScript, SQL, System Design
**नेटवर्किंग**: LinkedIn, GitHub, कार्यक्रम
**नौकरी खोज**: अनुभवी, रेफरल, आवेदन`;
    }
    if (lowerMessage.includes('python')) {
      return `**पायथन प्रोग्रामिंग भाषा**:

• **मूलभूत**: वाक्य विन्यास, डेटा प्रकार, कार्य, लूप
• **पुस्तकालय**: Pandas, NumPy, Matplotlib, Django, Flask
• **अभ्यास**: HackerRank, LeetCode, CodeSignal
• **परियोजनाएं**: डेटा विश्लेषण, वेब ऐप्स, स्वचालन
• **OOP**: कक्षाएं, विरासत, बहुरूपता`;
    }
    if (lowerMessage.includes('interview')) {
      return `**साक्षात्कार की तैयारी** - संपूर्ण गाइड:

**कोडिंग**: LeetCode, CodeForces (150+ समस्याएं)
**DS&A**: सरणी, स्ट्रिंग, पेड़, ग्राफ़, सॉर्टिंग
**System Design**: स्केलेबल सिस्टम डिज़ाइन करें
**आचरण**: STAR विधि, टीम का अनुभव
**अभ्यास**: मॉक साक्षात्कार, सहकर्मी अभ्यास`;
    }
    return `**शैक्षणिक सहायता** - हिंदी में उपलब्ध:

मैं आपकी मदद कर सकता हूं:

• **प्रोग्रामिंग**: पायथन, जावा, C++, JavaScript, SQL
• **डेटा साइंस**: Pandas, ML, Deep Learning
• **वेब विकास**: React, Node.js, HTML/CSS
• **कंप्यूटर विज्ञान**: DSA, DBMS, OS, System Design
• **करियर**: साक्षात्कार तैयारी, नौकरी खोज

अपना प्रश्न पूछें!`;
  }
  
  // SPANISH RESPONSES
  if (isSpanish) {
    if (lowerMessage.includes('data science')) {
      return `**Ciencia de Datos** - Hoja de ruta completa:

**Fundamentos**: Estadística, Probabilidad, Álgebra Lineal
**Programación**: Python (Pandas, NumPy, Scikit-learn), SQL
**Visualización**: Matplotlib, Seaborn, Plotly
**ML**: Regresión, Clasificación, Clustering
**Habilidades**: Ingeniería de características, Selección de modelos
**Práctica**: Competencias de Kaggle, Conjuntos de datos reales`;
    }
    if (lowerMessage.includes('career') || lowerMessage.includes('job')) {
      return `**Orientación Profesional** - Industria Tecnológica:

**Preparación**: DSA, System Design, Proyectos, Currículum
**Entrevista**: Codificación, Resolución de problemas
**Habilidades**: Java, Python, JavaScript, SQL
**Redes**: LinkedIn, GitHub, Eventos
**Búsqueda de trabajo**: Portales, Referidos, Solicitudes`;
    }
    if (lowerMessage.includes('python')) {
      return `**Programación en Python**:

• **Básicos**: Sintaxis, Tipos de datos, Funciones, Bucles
• **Bibliotecas**: Pandas, NumPy, Matplotlib, Django
• **Práctica**: HackerRank, LeetCode, CodeSignal
• **Proyectos**: Análisis de datos, Aplicaciones web
• **OOP**: Clases, Herencia, Polimorfismo`;
    }
    return `**Ayuda Educativa Disponible** - En español:

Puedo ayudarte con:

• **Programación**: Python, Java, C++, JavaScript, SQL
• **Ciencia de Datos**: Pandas, ML, Deep Learning
• **Desarrollo Web**: React, Node.js, HTML/CSS
• **Ciencias Computacionales**: DSA, DBMS, OS
• **Carrera**: Preparación de entrevistas, Búsqueda de trabajo

¡Haz tu pregunta!`;
  }
  
  // FRENCH RESPONSES
  if (isFrench) {
    if (lowerMessage.includes('data science')) {
      return `**Data Science** - Feuille de route complète:

**Fondamentaux**: Statistiques, Probabilité, Algèbre Linéaire
**Programmation**: Python (Pandas, NumPy, Scikit-learn), SQL
**Visualisation**: Matplotlib, Seaborn, Plotly
**ML**: Régression, Classification, Clustering
**Compétences**: Ingénierie des caractéristiques, Sélection de modèles
**Pratique**: Compétitions Kaggle, Ensembles de données réels`;
    }
    if (lowerMessage.includes('career') || lowerMessage.includes('job')) {
      return `**Guidance Professionnelle** - Industrie Technologique:

**Préparation**: DSA, System Design, Projets, CV
**Entretien**: Codage, Résolution de problèmes
**Compétences**: Java, Python, JavaScript, SQL
**Réseautage**: LinkedIn, GitHub, Événements
**Recherche d'emploi**: Portails, Recommandations, Candidatures`;
    }
    if (lowerMessage.includes('python')) {
      return `**Programmation en Python**:

• **Bases**: Syntaxe, Types de données, Fonctions, Boucles
• **Bibliothèques**: Pandas, NumPy, Matplotlib, Django
• **Pratique**: HackerRank, LeetCode, CodeSignal
• **Projets**: Analyse de données, Applications web
• **POO**: Classes, Héritage, Polymorphisme`;
    }
    return `**Aide Pédagogique Disponible** - En français:

Je peux vous aider avec:

• **Programmation**: Python, Java, C++, JavaScript, SQL
• **Data Science**: Pandas, ML, Deep Learning
• **Développement Web**: React, Node.js, HTML/CSS
• **Informatique**: DSA, DBMS, OS
• **Carrière**: Préparation d'entretiens, Recherche d'emploi

Posez votre question!`;
  }
  
  // TELUGU RESPONSES
  if (isTelugu) {
    if (lowerMessage.includes('data science')) {
      return `**డేటా సైన్స్** - సంపూర్ణ గైడ్:

**పునాదులు**: గణాంకాలు, సంభావ్యత, సరళ బీజగణితం
**ప్రోగ్రామింగ్**: పైథాన్ (Pandas, NumPy, Scikit-learn), SQL
**విజువలైజేషన్**: Matplotlib, Seaborn, Plotly
**ML**: రిగ్రెషన్, వర్గీకరణ, క్లస్టరింగ్
**నైపుణ్యాలు**: ఫీచర్ ఇంజనీరింగ్, మోడల్ ఎంపిక
**ప్రాక్టీస్**: కాగిల్ పోటీలు, నిజమైన డేటాసెట్‌లు`;
    }
    if (lowerMessage.includes('career') || lowerMessage.includes('job')) {
      return `**కెరీర్ గైడెన్స్** - టెక్ ఇండస్ట్రీ:

**తయారీ**: DSA, System Design, ప్రజెక్ట్‌లు, రిజ్యూమె
**సాక్ష్యం**: కోడింగ్, సమస్య పరిష్కారం, డిజాइన్
**నైపుణ్యాలు**: జావా, పైథాన్, జావాస్క్రిప్ట్, SQL
**నెట్‌వర్కింగ్**: లింక్‌డిన్, గిట్‌హబ్, ఈవెంట్‌లు
**ఉద్యోగ శోధన**: పోర్టల్‌లు, సిఫారసులు`;
    }
    if (lowerMessage.includes('python')) {
      return `**పైథాన్ ప్రోగ్రామింగ్**:

• **ప్రాథమికాలు**: సింటాక్స్, డేటా రకాలు, ఫంక్షన్‌లు, లూప్‌లు
• **లైబ్రరీలు**: Pandas, NumPy, Matplotlib, Django
• **ప్రాక్టీస్**: HackerRank, LeetCode, CodeSignal
• **ప్రజెక్ట్‌లు**: డేటా విశ్లేషణ, వెబ్ యాప్‌లు
• **OOP**: క్లాస్‌లు, ఇన్‌హెరిటెన్స్, పాలిమార్ఫిజం`;
    }
    return `**విద్యా సహాయం** - తెలుగులో లభ్యమైనది:

నేను మీకు సహాయం చేయగలను:

• **ప్రోగ్రామింగ్**: పైథాన్, జావా, C++, జావాస్క్రిప్ట్
• **డేటా సైన్స్**: Pandas, ML, Deep Learning
• **వెబ్ డెవలపమెంట్**: React, Node.js, HTML/CSS
• **కంప్యూటర్ సైన్స్**: DSA, DBMS, OS
• **కెరీర్**: ఇంటర్వ్యూ తయారీ, ఉద్యోగ శోధన

ఆపస్‌ప్రశ్న అడగండి!`;
  }
  
  // DEFAULT ENGLISH RESPONSES
  if (lowerMessage.includes('pandas')) {
    return `**Pandas** - Data Analysis Library:

• **Purpose**: Data manipulation, cleaning, and analysis
• **Key Features**: DataFrames, Series, CSV/Excel reading
• **Common Operations**: Filtering, grouping, merging, pivoting
• **Example**: \`df.groupby('category').sum()\`
• **Learn**: Start with basic operations, then advanced techniques
• **Resources**: Kaggle datasets, DataCamp courses`;
  }
  if (lowerMessage.includes('machine learning') || lowerMessage.includes('ml')) {
    return `**Machine Learning** - Complete Overview:

• **Types**: Supervised (classification, regression), Unsupervised (clustering)
• **Supervised Learning**: Linear regression, Decision trees, SVM, Random Forest, Neural Networks
• **Unsupervised Learning**: K-means, Hierarchical clustering, PCA
• **Process**: Data collection → Feature engineering → Model training → Evaluation
• **Tools**: Scikit-learn, TensorFlow, PyTorch
• **Interview Focus**: Overfitting, bias-variance, cross-validation`;
  }
  if (lowerMessage.includes('data science')) {
    return `**Data Science** - Complete Roadmap:

**Foundations**: Statistics, Probability, Linear Algebra
**Programming**: Python (Pandas, NumPy, Scikit-learn), SQL
**Visualization**: Matplotlib, Seaborn, Plotly
**ML**: Regression, Classification, Clustering
**Project Skills**: Feature engineering, model selection, hyperparameter tuning
**Advanced**: Deep Learning, NLP, Time Series
**Practice**: Kaggle competitions, real-world datasets
**Timeline**: 4-6 months with dedicated effort`;
  }
  if (lowerMessage.includes('python')) {
    return `**Python** - Programming Language:

• **Syntax**: Clean, readable, beginner-friendly
• **Data Types**: int, float, str, list, dict, tuple, set
• **Control Flow**: if/else, loops (for, while), functions
• **OOP**: Classes, objects, inheritance, polymorphism
• **Libraries**: Pandas, NumPy, Django, Flask, Requests
• **Practice**: HackerRank, LeetCode, CodeSignal
• **Jobs**: Data Science, Web Development, Automation`;
  }
  if (lowerMessage.includes('javascript') || lowerMessage.includes('js')) {
    return `**JavaScript** - Web Development Language:

• **Basics**: Variables (let, const, var), data types, operators
• **DOM Manipulation**: Select, modify, create HTML elements
• **Functions**: Regular functions, arrow functions, callbacks
• **Async**: Promises, async/await, Fetch API
• **Frameworks**: React, Vue, Angular, Node.js
• **Modern Features**: ES6+, destructuring, spread operator
• **Practice**: Build interactive websites, APIs`;
  }
  if (lowerMessage.includes('career') || lowerMessage.includes('interview') || lowerMessage.includes('job')) {
    return `**Career & Interview Preparation** - Complete Guide:

**Preparation**: DSA (150+ problems), System Design, Projects, Resume
**Technical Interview**: Coding round, problem-solving, communication
**System Design**: Architecture, scalability, trade-offs, databases
**Behavioral**: STAR method, team experience, leadership
**Resume**: Highlight achievements, tech stack, impact
**Practice**: Mock interviews, peer practice, YouTube explanations
**Platforms**: LeetCode, CodeForces, InterviewBit, GeeksforGeeks
**Resources**: "Cracking the Coding Interview" book`;
  }
  
  return `**I can help with ALL education-related topics:**

**Ask me about:**
• Programming (Python, Java, JavaScript, C++, SQL)
• Data Science & ML (Pandas, NumPy, ML, Deep Learning)
• Web Development (React, Node.js, HTML/CSS)
• Computer Science (DSA, DBMS, OS, System Design)
• Career & Interviews
• Academic Subjects

**All responses are in your selected language!**

What would you like to learn?`;
};
