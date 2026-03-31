// Navigation between sections
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetSection = button.getAttribute('data-section');
        
        // Update active states
        navButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        sections.forEach(section => section.classList.remove('active'));
        document.getElementById(targetSection).classList.add('active');
    });
});

// Auto-fill example for Research Title
function autoFillTitle() {
    document.getElementById('topic').value = 'Effects of gamification on student motivation';
    document.getElementById('targetGroup').value = 'College students';
    document.getElementById('variables').value = 'Engagement levels, academic performance, learning satisfaction';
}

// Auto-fill example for Problem Statement
function autoFillProblem() {
    document.getElementById('problemTopic').value = 'Impact of artificial intelligence tools on creative writing skills';
}

// Auto-fill example for Significance
function autoFillSignificance() {
    document.getElementById('sigTopic').value = 'Blended learning approaches in mathematics education';
    document.getElementById('beneficiaries').value = 'Students, Teachers, School Administrators, Parents';
}

// Add beneficiary chip functionality
function addBeneficiary(beneficiary) {
    const input = document.getElementById('beneficiaries');
    const currentValue = input.value.trim();
    
    if (currentValue === '') {
        input.value = beneficiary;
    } else {
        const beneficiaries = currentValue.split(',').map(b => b.trim());
        if (!beneficiaries.includes(beneficiary)) {
            input.value = currentValue + ', ' + beneficiary;
        }
    }
}

// Generate Research Titles
function generateTitles() {
    const topic = document.getElementById('topic').value.trim();
    const targetGroup = document.getElementById('targetGroup').value.trim();
    const variables = document.getElementById('variables').value.trim();
    
    if (!topic || !targetGroup) {
        const msg = currentLanguage === 'fil' 
            ? 'Mangyaring punan ang lahat ng kailangan na mga campo (Paksa ng Pag-aaral at Target na Grupo)' 
            : 'Please fill in the required fields (Study Topic and Target Group)';
        alert(msg);
        return;
    }
    
    const titles = [];
    
    // Generate different title formats
    titles.push(`The Impact of ${topic} on ${targetGroup}: A Comprehensive Study`);
    titles.push(`Exploring ${topic} Among ${targetGroup}: An Investigative Approach`);
    titles.push(`${topic} and Its Effects on ${targetGroup}: A Research Analysis`);
    
    if (variables) {
        titles.push(`The Relationship Between ${topic} and ${variables} Among ${targetGroup}`);
        titles.push(`Assessing ${topic}: Its Influence on ${variables} in ${targetGroup}`);
    } else {
        titles.push(`Understanding ${topic} in the Context of ${targetGroup}`);
        titles.push(`A Study on ${topic}: Perspectives from ${targetGroup}`);
    }
    
    displayTitlesWithCopy(titles);
}

// Display titles with copy functionality
function displayTitlesWithCopy(titles) {
    const resultsDiv = document.getElementById('titleResults');
    
    let html = `<div class="result-card">
        <h3>Generated Research Titles</h3>
        <p style="color: #666; margin-bottom: 15px; font-size: 0.95em;">Click the copy icon to copy the title to clipboard</p>
        <ul class="title-list">`;
    
    titles.forEach((title, index) => {
        const number = index + 1;
        html += `
            <li class="title-item">
                <span class="title-number">${number}</span>
                <span class="title-text" id="title-${index}">${title}</span>
                <button class="copy-icon-btn" onclick="copyTitle(${index}, event)" title="Copy to clipboard">
                    <i data-lucide="clipboard" style="width: 16px; height: 16px;"></i>
                </button>
            </li>`;
    });
    
    html += `</ul></div>`;
    
    resultsDiv.innerHTML = html;
    lucide.createIcons();
}

// Copy title to clipboard
function copyTitle(index, event) {
    const titleElement = document.getElementById(`title-${index}`);
    const titleText = titleElement.innerText;
    
    navigator.clipboard.writeText(titleText).then(() => {
        // Visual feedback
        const btn = event.currentTarget;
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i data-lucide="check" style="width:16px; height:16px;"></i>';
        btn.style.background = '#52c41a';
        lucide.createIcons();
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            lucide.createIcons();
        }, 1500);
        
        // Show notification
        const msg = currentLanguage === 'fil' 
            ? 'Nagsalin ng pamagat sa clipboard!' 
            : 'Title copied to clipboard!';
        showNotification(msg);
    }).catch(err => {
        const msg = currentLanguage === 'fil' 
            ? 'Nabigong kopyahin. Mangyaring subukan ulit.' 
            : 'Failed to copy. Please try again.';
        alert(msg);
    });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerText = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Generate Problem Statements
function generateProblems() {
    const topic = document.getElementById('problemTopic').value.trim();
    
    if (!topic) {
        const msg = currentLanguage === 'fil' 
            ? 'Mangyaring magpasok ng paksa ng pananaliksik' 
            : 'Please enter a research topic';
        alert(msg);
        return;
    }
    
    const problems = [
        `What is the current state of ${topic} in the target population?`,
        `How does ${topic} affect the participants' overall experience and outcomes?`,
        `What are the main challenges and barriers related to ${topic}?`,
        `What factors contribute to the effectiveness or ineffectiveness of ${topic}?`,
        `What are the perceptions and attitudes of stakeholders regarding ${topic}?`,
        `How can ${topic} be improved or optimized for better results?`,
        `What is the relationship between ${topic} and other relevant variables in the study context?`
    ];
    
    displayQuestionsWithCopy(problems);
}

// Display questions with copy functionality
function displayQuestionsWithCopy(questions) {
    const resultsDiv = document.getElementById('problemResults');
    
    let html = `<div class="result-card">
        <h3>Research Questions</h3>
        <p style="color: #666; margin-bottom: 15px; font-size: 0.95em;">Click the copy icon to copy any question to clipboard</p>
        <ul class="title-list">`;
    
    questions.forEach((question, index) => {
        const number = index + 1;
        html += `
            <li class="title-item">
                <span class="title-number">${number}</span>
                <span class="title-text" id="question-${index}">${question}</span>
                <button class="copy-icon-btn" onclick="copyQuestion(${index}, event)" title="Copy to clipboard">
                    <i data-lucide="clipboard" style="width: 16px; height: 16px;"></i>
                </button>
            </li>`;
    });
    
    html += `</ul></div>`;
    
    resultsDiv.innerHTML = html;
    lucide.createIcons();
}

// Copy question to clipboard
function copyQuestion(index, event) {
    const questionElement = document.getElementById(`question-${index}`);
    const questionText = questionElement.innerText;
    
    navigator.clipboard.writeText(questionText).then(() => {
        // Visual feedback
        const btn = event.currentTarget;
        btn.innerHTML = '<i data-lucide="check" style="width:16px; height:16px;"></i>';
        btn.style.background = '#52c41a';
        lucide.createIcons();
        
        setTimeout(() => {
            btn.innerHTML = '<i data-lucide="clipboard" style="width:16px; height:16px;"></i>';
            btn.style.background = '';
            lucide.createIcons();
        }, 1500);
        
        // Show notification
        const msg = currentLanguage === 'fil' 
            ? 'Nagsalin ng tanong sa clipboard!' 
            : 'Question copied to clipboard!';
        showNotification(msg);
    }).catch(err => {
        const msg = currentLanguage === 'fil' 
            ? 'Nabigong kopyahin. Mangyaring subukan ulit.' 
            : 'Failed to copy. Please try again.';
        alert(msg);
    });
}

// Generate Significance of the Study
function generateSignificance() {
    const topic = document.getElementById('sigTopic').value.trim();
    const beneficiaries = document.getElementById('beneficiaries').value.trim();
    
    if (!topic || !beneficiaries) {
        const msg = currentLanguage === 'fil' 
            ? 'Mangyaring punan ang lahat ng kailangan na mga campo' 
            : 'Please fill in all required fields';
        alert(msg);
        return;
    }
    
    const beneficiaryList = beneficiaries.split(',').map(b => b.trim());
    
    let significance = `<div class="result-card">
        <h3>Significance of the Study</h3>
        <p style="margin-bottom: 20px; line-height: 1.8; color: #333;">
            This study on <strong>${topic}</strong> holds significant value for various stakeholders in the educational and research community. 
            The findings of this research will contribute to the existing body of knowledge and provide practical insights that can be applied 
            to improve current practices and policies.
        </p>
        <h4 style="color: #667eea; margin-top: 20px; margin-bottom: 15px;">Benefits to Stakeholders:</h4>
        <ul style="list-style: none; padding-left: 0;">`;
    
    beneficiaryList.forEach(beneficiary => {
        let benefit = '';
        const lowerBeneficiary = beneficiary.toLowerCase();
        
        if (lowerBeneficiary.includes('student')) {
            benefit = `<strong>${beneficiary}:</strong> This research will provide valuable insights that can enhance their learning experience, 
            improve their understanding of ${topic}, and help them develop better strategies for academic success. The findings will directly 
            inform improvements in learning materials, teaching methods, and educational resources tailored to their needs.`;
        } else if (lowerBeneficiary.includes('teacher') || lowerBeneficiary.includes('educator') || lowerBeneficiary.includes('instructor')) {
            benefit = `<strong>${beneficiary}:</strong> The findings will equip them with evidence-based strategies and approaches to better 
            address ${topic} in their teaching practice, leading to more effective instruction and improved student outcomes. They will gain 
            practical tools and methodologies that can be immediately implemented in their classrooms.`;
        } else if (lowerBeneficiary.includes('parent')) {
            benefit = `<strong>${beneficiary}:</strong> This study will help them better understand ${topic} and its implications, 
            enabling them to provide more informed support and guidance to their children. The research will offer practical recommendations 
            for home-based support strategies that complement school-based learning.`;
        } else if (lowerBeneficiary.includes('administrator') || lowerBeneficiary.includes('school')) {
            benefit = `<strong>${beneficiary}:</strong> The research will inform policy decisions and resource allocation related to ${topic}, 
            helping create more effective programs and interventions. The findings will provide data-driven insights for strategic planning, 
            curriculum development, and institutional improvement initiatives.`;
        } else if (lowerBeneficiary.includes('researcher')) {
            benefit = `<strong>${beneficiary}:</strong> This study will contribute to the academic literature on ${topic}, 
            providing a foundation for future research and expanding theoretical frameworks in the field. It will identify gaps in current 
            knowledge and suggest directions for subsequent investigations.`;
        } else if (lowerBeneficiary.includes('community')) {
            benefit = `<strong>${beneficiary}:</strong> The findings will raise awareness about ${topic} and its broader implications, 
            fostering community engagement and support for related initiatives. The research will demonstrate the societal value of addressing 
            this issue and encourage collaborative efforts toward improvement.`;
        } else {
            benefit = `<strong>${beneficiary}:</strong> This research will provide valuable insights and practical recommendations 
            related to ${topic}, contributing to improved practices and outcomes in their respective areas. The findings will offer 
            evidence-based guidance that can inform decision-making and enhance effectiveness.`;
        }
        
        significance += `<li style="padding: 15px; margin-bottom: 12px; background: white; border-radius: 6px; 
        box-shadow: 0 2px 5px rgba(0,0,0,0.05); line-height: 1.7; color: #555;">${benefit}</li>`;
    });
    
    significance += `</ul>
        <p style="margin-top: 20px; line-height: 1.8; color: #333;">
            Overall, this study addresses a critical gap in current research and practice, offering evidence-based solutions 
            that can lead to meaningful improvements in how we understand and approach ${topic}. The comprehensive nature of 
            this research ensures that multiple perspectives are considered, making the findings broadly applicable and impactful.
        </p>
    </div>`;
    
    document.getElementById('significanceResults').innerHTML = significance;
}

// Search websites with topic
function searchWebsite(site) {
    const topic = document.getElementById('rrlTopic').value.trim();
    
    if (!topic) {
        const msg = currentLanguage === 'fil' 
            ? 'Mangyaring magpasok ng iyong paksa ng pag-aaral muna' 
            : 'Please enter your study topic first';
        alert(msg);
        return;
    }
    
    const encodedTopic = encodeURIComponent(topic);
    let url = '';
    
    switch(site) {
        case 'scholar':
            url = `https://scholar.google.com/scholar?q=${encodedTopic}`;
            break;
        case 'eric':
            url = `https://eric.ed.gov/?q=${encodedTopic}`;
            break;
        case 'pubmed':
            url = `https://pubmed.ncbi.nlm.nih.gov/?term=${encodedTopic}`;
            break;
        case 'researchgate':
            url = `https://www.researchgate.net/search/publication?q=${encodedTopic}`;
            break;
        case 'jstor':
            url = `https://www.jstor.org/action/doBasicSearch?Query=${encodedTopic}`;
            break;
        case 'wikipedia':
            url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodedTopic}&format=json&origin=*`;
            // For Wikipedia, we'll do a search and redirect to results page
            url = `https://en.wikipedia.org/w/index.php?search=${encodedTopic}`;
            break;
    }
    
    window.open(url, '_blank');
}

// Generate citation from URL
function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function parseYear(value, fallbackYear) {
    if (!value) {
        return fallbackYear;
    }

    const yearMatch = String(value).match(/\b(19|20)\d{2}\b/);
    return yearMatch ? yearMatch[0] : fallbackYear;
}

function toInitials(name) {
    if (!name) {
        return 'A. A. Author';
    }

    const parts = name.trim().split(/\s+/);
    if (parts.length < 2) {
        return name;
    }

    const lastName = parts[parts.length - 1];
    const firstNames = parts.slice(0, -1).map(part => `${part.charAt(0).toUpperCase()}.`);
    return `${firstNames.join(' ')} ${lastName}`;
}

function formatCrossrefAuthors(authors) {
    if (!Array.isArray(authors) || authors.length === 0) {
        return '';
    }

    return authors
        .map(author => {
            const given = (author.given || '').trim();
            const family = (author.family || '').trim();
            if (given && family) {
                return `${family}, ${given}`;
            }
            return (author.name || '').trim();
        })
        .filter(Boolean)
        .join('; ');
}

function extractDoiFromText(text) {
    if (!text) {
        return '';
    }

    const doiMatch = String(text).match(/10\.\d{4,9}\/[-._;()/:A-Z0-9]+/i);
    return doiMatch ? doiMatch[0] : '';
}

async function fetchCrossrefByDoi(doi) {
    if (!doi) {
        return null;
    }

    try {
        const response = await fetch(`https://api.crossref.org/works/${encodeURIComponent(doi)}`);
        if (!response.ok) {
            return null;
        }

        const payload = await response.json();
        const message = payload && payload.message ? payload.message : null;
        if (!message) {
            return null;
        }

        const title = Array.isArray(message.title) && message.title[0] ? message.title[0] : '';
        const journal = Array.isArray(message['container-title']) && message['container-title'][0]
            ? message['container-title'][0]
            : '';
        const publisher = message.publisher || '';
        const volume = message.volume || '';
        const issue = message.issue || '';
        const pages = message.page || '';
        const rawDate = (message.created && Array.isArray(message.created['date-parts']) && message.created['date-parts'][0])
            ? String(message.created['date-parts'][0][0] || '')
            : '';

        return {
            title,
            author: formatCrossrefAuthors(message.author),
            siteName: '',
            journal,
            publisher,
            volume,
            issue,
            pages,
            rawDate
        };
    } catch (error) {
        return null;
    }
}

function mergeMetadata(primary, fallback) {
    if (!primary && !fallback) {
        return null;
    }

    const p = primary || {};
    const f = fallback || {};

    return {
        title: p.title || f.title || '',
        author: p.author || f.author || '',
        siteName: p.siteName || f.siteName || '',
        journal: p.journal || f.journal || '',
        publisher: p.publisher || f.publisher || '',
        volume: p.volume || f.volume || '',
        issue: p.issue || f.issue || '',
        pages: p.pages || f.pages || '',
        rawDate: p.rawDate || f.rawDate || ''
    };
}

async function fetchPageMetadata(url) {
    if (!fetchPageMetadata.cache) {
        fetchPageMetadata.cache = new Map();
    }

    const cached = fetchPageMetadata.cache.get(url);
    if (cached && (Date.now() - cached.timestamp) < 5 * 60 * 1000) {
        return cached.data;
    }

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(`/api/metadata?url=${encodeURIComponent(url)}`, {
            signal: controller.signal
        });
        clearTimeout(timeout);

        if (!response.ok) {
            return null;
        }

        const metadata = await response.json();
        fetchPageMetadata.cache.set(url, {
            data: metadata || null,
            timestamp: Date.now()
        });
        return metadata || null;
    } catch (error) {
        return null;
    }
}

function setAutoFilledInputValue(input, nextValue) {
    if (!input) {
        return;
    }

    const currentValue = input.value.trim();
    const previousAutoFilledValue = (input.dataset.autofillValue || '').trim();
    const isSafeToReplace = !currentValue || currentValue === previousAutoFilledValue;

    if (!isSafeToReplace) {
        return;
    }

    const valueToApply = String(nextValue || '').trim();
    input.value = valueToApply;
    input.dataset.autofillValue = valueToApply;
}

async function generateCitation() {
    const url = document.getElementById('citationUrl').value.trim();
    const style = document.getElementById('citationStyle').value;
    const sourceType = document.getElementById('citationSourceType').value;
    
    if (!url) {
        const msg = currentLanguage === 'fil' 
            ? 'Mangyaring magpasok ng URL' 
            : 'Please enter a URL';
        alert(msg);
        return;
    }
    
    // Extract domain and basic info
    let domain = '';
    let siteName = '';
    try {
        const urlObj = new URL(url);
        domain = urlObj.hostname.replace('www.', '');
        siteName = domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1);
    } catch (e) {
        const msg = currentLanguage === 'fil' 
            ? 'Mangyaring magpasok ng valid na URL (kasama ang https://)' 
            : 'Please enter a valid URL (include https://)';
        alert(msg);
        return;
    }
    
    const generateButton = document.querySelector('#citation-card .btn-primary');
    if (generateButton) {
        generateButton.disabled = true;
        generateButton.innerText = currentLanguage === 'fil' ? 'Kinukuha ang detalye...' : 'Fetching details...';
    }

    const today = new Date();
    const year = today.getFullYear();
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const month = monthNames[today.getMonth()];
    const day = today.getDate();

    const metadata = await fetchPageMetadata(url);
    const authorInput = document.getElementById('citationAuthor');
    const titleInput = document.getElementById('citationTitle');
    const yearInput = document.getElementById('citationYear');

    const nextAuthor = metadata && metadata.author ? metadata.author : '';
    const nextTitle = metadata && metadata.title ? metadata.title : '';
    const nextYear = metadata && metadata.rawDate ? parseYear(metadata.rawDate, year) : '';

    setAutoFilledInputValue(authorInput, nextAuthor);
    setAutoFilledInputValue(titleInput, nextTitle);
    setAutoFilledInputValue(yearInput, nextYear);

    const manualAuthor = authorInput ? authorInput.value.trim() : '';
    const manualTitle = titleInput ? titleInput.value.trim() : '';
    const manualYear = yearInput ? yearInput.value.trim() : '';

    const extractedTitle = manualTitle || (metadata && metadata.title ? metadata.title : '[Page title]');
    const extractedAuthor = manualAuthor || (metadata && metadata.author ? metadata.author : '[Author Last, First]');
    const extractedYear = manualYear || parseYear(metadata ? metadata.rawDate : '', year);
    const extractedSiteName = metadata && metadata.siteName ? metadata.siteName : siteName;
    const extractedJournal = metadata && metadata.journal ? metadata.journal : '[Journal Name]';
    const extractedVolume = metadata && metadata.volume ? metadata.volume : '[Volume]';
    const extractedIssue = metadata && metadata.issue ? metadata.issue : '[Issue]';
    const extractedPages = metadata && metadata.pages ? metadata.pages : '[Pages]';
    const extractedPublisher = metadata && metadata.publisher ? metadata.publisher : '[Publisher]';
    const ieeeAuthor = extractedAuthor !== '[Author Last, First]' ? toInitials(extractedAuthor) : 'A. A. Author';
    
    let citation = '';

    if (style === 'apa') {
        if (sourceType === 'website') {
            citation = `${escapeHtml(extractedAuthor)}. (${escapeHtml(extractedYear)}). <em>${escapeHtml(extractedTitle)}</em>. ${escapeHtml(extractedSiteName)}. Retrieved ${month} ${day}, ${year}, from ${escapeHtml(url)}`;
        } else if (sourceType === 'journal') {
            citation = `${escapeHtml(extractedAuthor)}. (${escapeHtml(extractedYear)}). ${escapeHtml(extractedTitle)}. <em>${escapeHtml(extractedJournal)}</em>, ${escapeHtml(extractedVolume)}(${escapeHtml(extractedIssue)}), ${escapeHtml(extractedPages)}. ${escapeHtml(url)}`;
        } else {
            citation = `${escapeHtml(extractedAuthor)}. (${escapeHtml(extractedYear)}). <em>${escapeHtml(extractedTitle)}</em>. ${escapeHtml(extractedPublisher)}.`;
        }
    } else if (style === 'mla') {
        if (sourceType === 'website') {
            citation = `"${escapeHtml(extractedTitle)}." <em>${escapeHtml(extractedSiteName)}</em>, ${day} ${month.substring(0, 3)}. ${escapeHtml(extractedYear)}, ${escapeHtml(url)}.`;
        } else if (sourceType === 'journal') {
            citation = `${escapeHtml(extractedAuthor)}. "${escapeHtml(extractedTitle)}." <em>${escapeHtml(extractedJournal)}</em>, vol. ${escapeHtml(extractedVolume)}, no. ${escapeHtml(extractedIssue)}, ${escapeHtml(extractedYear)}, pp. ${escapeHtml(extractedPages)}, ${escapeHtml(url)}.`;
        } else {
            citation = `${escapeHtml(extractedAuthor)}. <em>${escapeHtml(extractedTitle)}</em>. ${escapeHtml(extractedPublisher)}, ${escapeHtml(extractedYear)}.`;
        }
    } else if (style === 'chicago') {
        if (sourceType === 'website') {
            citation = `${escapeHtml(extractedAuthor)}. "${escapeHtml(extractedTitle)}." ${escapeHtml(extractedSiteName)}. Accessed ${month} ${day}, ${year}. ${escapeHtml(url)}.`;
        } else if (sourceType === 'journal') {
            citation = `${escapeHtml(extractedAuthor)}. "${escapeHtml(extractedTitle)}." <em>${escapeHtml(extractedJournal)}</em> ${escapeHtml(extractedVolume)}, no. ${escapeHtml(extractedIssue)} (${escapeHtml(extractedYear)}): ${escapeHtml(extractedPages)}. ${escapeHtml(url)}.`;
        } else {
            citation = `${escapeHtml(extractedAuthor)}. <em>${escapeHtml(extractedTitle)}</em>. [City]: ${escapeHtml(extractedPublisher)}, ${escapeHtml(extractedYear)}.`;
        }
    } else if (style === 'ieee') {
        if (sourceType === 'website') {
            citation = `[1] ${escapeHtml(ieeeAuthor)}, "${escapeHtml(extractedTitle)}," ${escapeHtml(extractedSiteName)}. [Online]. Available: ${escapeHtml(url)}. [Accessed: ${day}-${month.substring(0, 3)}-${year}].`;
        } else if (sourceType === 'journal') {
            citation = `[1] ${escapeHtml(ieeeAuthor)}, "${escapeHtml(extractedTitle)}," <em>${escapeHtml(extractedJournal)}</em>, vol. ${escapeHtml(extractedVolume)}, no. ${escapeHtml(extractedIssue)}, pp. ${escapeHtml(extractedPages)}, ${escapeHtml(extractedYear)}.`;
        } else {
            citation = `[1] ${escapeHtml(ieeeAuthor)}, <em>${escapeHtml(extractedTitle)}</em>. [City]: ${escapeHtml(extractedPublisher)}, ${escapeHtml(extractedYear)}.`;
        }
    }
    
    const resultHTML = `
        <div class="citation-output">
            <h4>Generated ${style.toUpperCase()} Citation (${sourceType}):</h4>
            <div class="citation-text">${citation}</div>
            <button class="copy-btn" onclick="copyCitation()">
                <i data-lucide="clipboard" style="width:16px; height:16px; margin-right:8px;"></i>
                ${currentLanguage === 'fil' ? 'Kopyahin ang Pagsipi' : 'Copy Citation'}
            </button>
            <p style="margin-top: 15px; color: #666; font-size: 0.9em;">
                <strong>Note:</strong> Auto-fetch depends on website metadata and browser access rules. 
                Verify author/title/year before final submission.
            </p>
        </div>
    `;
    
    document.getElementById('citationResult').innerHTML = resultHTML;
    lucide.createIcons();

    if (generateButton) {
        generateButton.disabled = false;
        generateButton.innerText = currentLanguage === 'fil' ? 'Lumikha →' : 'Generate →';
    }
}

// Copy citation to clipboard
function copyCitation() {
    const citationText = document.querySelector('.citation-text').innerText;
    navigator.clipboard.writeText(citationText).then(() => {
        const msg = currentLanguage === 'fil' 
            ? 'Nagsalin ng pagsipi sa clipboard!' 
            : 'Citation copied to clipboard!';
        alert(msg);
    });
}

// Display results helper function
function displayResults(elementId, title, items) {
    const resultsDiv = document.getElementById(elementId);
    
    let html = `<div class="result-card">
        <h3>${title}</h3>
        <ul>`;
    
    items.forEach(item => {
        html += `<li>${item}</li>`;
    });
    
    html += `</ul></div>`;
    
    resultsDiv.innerHTML = html;
}

// ========== LANGUAGE SWITCHING ==========
let currentLanguage = 'en';

const translations = {
    en: {
        'research-assistant': 'Research Assistant',
        'made-easy': 'Made Easy · AI-Powered',
        'tools': 'TOOLS',
        'research-title': 'Research Title',
        'generate-titles': 'Generate titles',
        'significance': 'Significance',
        'why-matters': 'Why it matters',
        'problem-statement': 'Problem Statement',
        'define-problem': 'Define the problem',
        'rrl-rrs': 'RRL & RRS',
        'literature-guide': 'Literature guide',
        'citation': 'Citation',
        'apa-7th': 'APA, MLA, Chicago, IEEE',
        'language': 'Language',
        'research-made-easy': 'RESEARCH MADE EASY',
        'interactive-skills': 'Interactive Research Skills',
        'step-by-step': 'Step-by-step AI guidance for writing titles, significance, problem statements, literature reviews, and citations.',
        'research-title-gen': 'Research Title Generator',
        'create-titles': "Let's create compelling research titles based on your study details.",
        'use-sample': 'Use sample',
        'study-topic': 'Study Topic:',
        'topic-placeholder': 'e.g., Effects of social media on academic performance',
        'target-group': 'Target Group:',
        'group-placeholder': 'e.g., High school students',
        'variables-optional': 'Variables (Optional):',
        'variables-placeholder': 'e.g., Study habits, screen time, grades',
        'generate': 'Generate →',
        'problem-title': 'Statement of the Problem',
        'problem-desc': 'Generate research questions and learn how to create a Statement of the Problem.',
        'research-topic': 'Research Topic:',
        'problem-topic-placeholder': 'e.g., Impact of online learning on student engagement',
        'significance-title': 'Significance of the Study',
        'sig-desc': 'Explain why your research matters and who will benefit from it.',
        'study-topic': 'Study Topic:',
        'sig-topic-placeholder': 'e.g., Effects of gamification on student motivation',
        'beneficiaries': 'Beneficiaries:',
        'beneficiaries-placeholder': 'e.g., Students, Teachers, Parents',
        'generated-titles': 'Generated Research Titles',
        'copy-icon': 'Click the copy icon to copy the title to clipboard',
        'research-questions': 'Research Questions',
        'copy-question': 'Click the copy icon to copy any question to clipboard',
        'sig-study': 'Significance of the Study',
        'benefits-stakeholders': 'Benefits to Stakeholders:',
        'citation-gen': 'Citation Generator',
        'format-source': 'Generate citations in APA, MLA, Chicago, or IEEE formats',
        'citation-style': 'Citation style',
        'source-type': 'Source type',
        'style-apa': 'APA 7th',
        'style-mla': 'MLA 9th',
        'style-chicago': 'Chicago',
        'style-ieee': 'IEEE',
        'source-website': 'Website',
        'journal-article': 'Journal Article',
        'source-book': 'Book',
        'source-details': 'Source details',
        'source-placeholder': 'Paste or type: title, author, year, URL, journal, volume, pages…',
        'rrl-title': 'RRL & RRS Guide',
        'rrl-desc': 'Learn how to write an effective Related Literature and Related Studies section.',
        'topic-label': 'Research Topic:',
        'rrl-placeholder': 'e.g., Impact of AI on education',
        'search-now': 'Search Now',
        'tips': 'Tips for Writing RRL & RRS',
        'required-fields': 'Please fill in all required fields',
        'enter-topic': 'Please enter a research topic',
        'enter-url': 'Please enter a URL (include https://)',
        'title-copied': 'Title copied to clipboard!',
        'question-copied': 'Question copied to clipboard!',
        'citation-copied': 'Citation copied to clipboard!',
        'failed-copy': 'Failed to copy. Please try again.',
        'copy-citation': '📋 Copy Citation',
        'generated-citation': 'Generated Citation:',
        'citation-note': 'Note: Please replace [Page title] with the actual title of the webpage. Add author name if available. This is a basic template - verify all details before using.'
    },
    fil: {
        'research-assistant': 'Research Assistant',
        'made-easy': 'Madaling Gawin · AI-Powered',
        'tools': 'KAGAMITAN',
        'research-title': 'Pamagat ng Pananaliksik',
        'generate-titles': 'Lumikha ng mga pamagat',
        'significance': 'Kahalagahan',
        'why-matters': 'Bakit ito mahalaga',
        'problem-statement': 'Pahayag ng Problema',
        'define-problem': 'Tukuyin ang problema',
        'rrl-rrs': 'Kaugnay na Panitala at Pag-aaral',
        'literature-guide': 'Gabay sa panitala',
        'citation': 'Pagsipi',
        'apa-7th': 'APA, MLA, Chicago, IEEE',
        'language': 'Wika',
        'research-made-easy': 'PANANALIKSIK MADALING GAWIN',
        'interactive-skills': 'Interactibong Kasanayan sa Pananaliksik',
        'step-by-step': 'Hakbang-hakbang na gabay ng AI para sa pagsusulat ng mga pamagat, kahalagahan, pahayag ng problema, pagsusuri ng panitala, at pagsipi.',
        'research-title-gen': 'Generator ng Pamagat ng Pananaliksik',
        'create-titles': 'Lumikha tayo ng nakaakit na mga pamagat batay sa iyong mga detalye ng pag-aaral.',
        'use-sample': 'Gumamit ng halimbawa',
        'study-topic': 'Paksa ng Pag-aaral:',
        'topic-placeholder': 'Halimbawa: Epekto ng social media sa academic na pagganap',
        'target-group': 'Target na Grupo:',
        'group-placeholder': 'Halimbawa: Mga estudyante sa mataas na paaralan',
        'variables-optional': 'Mga Baryable (Opsyonal):',
        'variables-placeholder': 'Halimbawa: Antas ng pag-aaral, oras sa screen, mga marka',
        'generate': 'Lumikha →',
        'problem-title': 'Pahayag ng Problema',
        'problem-desc': 'Lumikha ng mga tanong sa pananaliksik at matutunan kung paano gumawa ng Pahayag ng Problema.',
        'research-topic': 'Paksa ng Pananaliksik:',
        'problem-topic-placeholder': 'Halimbawa: Epekto ng online na pag-aaral sa kasangkupan ng mag-aaral',
        'significance-title': 'Kahalagahan ng Pag-aaral',
        'sig-desc': 'Ipaliwanag kung bakit mahalaga ang iyong pnanaliksik at sino ang makikinabang dito.',
        'study-topic': 'Paksa ng Pag-aaral:',
        'sig-topic-placeholder': 'Halimbawa: Epekto ng gamification sa pagnanais ng mga estudyante',
        'beneficiaries': 'Mga Nakikinabang:',
        'beneficiaries-placeholder': 'Halimbawa: Mga estudyante, Mga guro, Mga magulang',
        'generated-titles': 'Nabuo na mga Pamagat ng Pananaliksik',
        'copy-icon': 'Pagdiin ang icon na copy upang kopyahin ang pamagat sa clipboard',
        'research-questions': 'Mga Tanong sa Pananaliksik',
        'copy-question': 'Pagdiin ang icon na copy upang kopyahin ang tanong sa clipboard',
        'sig-study': 'Kahalagahan ng Pag-aaral',
        'benefits-stakeholders': 'Mga Benepisyo sa mga Stakeholder:',
        'citation-gen': 'Generator ng Pagsipi',
        'format-source': 'Lumikha ng pagsipi sa APA, MLA, Chicago, o IEEE na format',
        'citation-style': 'Estilo ng pagsipi',
        'source-type': 'Uri ng pinagkukunan',
        'style-apa': 'APA 7th',
        'style-mla': 'MLA 9th',
        'style-chicago': 'Chicago',
        'style-ieee': 'IEEE',
        'source-website': 'Website',
        'journal-article': 'Artikulong Jurnal',
        'source-book': 'Aklat',
        'source-details': 'Mga detalye ng pinagkukunan',
        'source-placeholder': 'I-paste o mag-type: pamagat, may-akda, taon, URL, jurnal, dami, mga pahina…',
        'rrl-title': 'Gabay sa RRL & RRS',
        'rrl-desc': 'Matutunan kung paano magsulat ng epektibong Kaugnay na Panitala at Kaugnay na Pag-aaral na seksyon.',
        'topic-label': 'Paksa ng Pananaliksik:',
        'rrl-placeholder': 'Halimbawa: Epekto ng AI sa edukasyon',
        'search-now': 'Maghanap Ngayon',
        'tips': 'Mga Tip para sa Pagsusulat ng RRL & RRS',
        'required-fields': 'Mangyaring punan ang lahat ng kailangan na mga campo',
        'enter-topic': 'Mangyaring magpasok ng paksa ng pananaliksik',
        'enter-url': 'Mangyaring magpasok ng URL (kasama ang https://)',
        'title-copied': 'Nagsalin ng pamagat sa clipboard!',
        'question-copied': 'Nagsalin ng tanong sa clipboard!',
        'citation-copied': 'Nagsalin ng pagsipi sa clipboard!',
        'failed-copy': 'Nabigong kopyahin. Mangyaring subukan ulit.',
        'copy-citation': 'Kopyahin ang Pagsipi',
        'generated-citation': 'Nabuo na Pagsipi:',
        'citation-note': 'Paalala: Mangyaring palitan ang [Pamagat ng Pahina] sa aktwal na pamagat ng webpage. Magdagdag ng pangalan ng may-akda kung available. Ito ay isang pangunahing template - i-verify ang lahat ng detalye bago gamitin.'
    }
};

// Initialize language switching
function initLanguageSwitching() {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const lang = btn.innerText.toLowerCase().includes('english') ? 'en' : 'fil';
            setLanguage(lang);
            localStorage.setItem('preferred-language', lang);
        });
    });
    
    // Check for saved language preference
    const savedLang = localStorage.getItem('preferred-language') || 'en';
    if (savedLang === 'fil') {
        document.querySelectorAll('.lang-btn').forEach((btn, idx) => {
            if (idx === 1) btn.click();
        });
    }
}

function setLanguage(lang) {
    currentLanguage = lang;
    
    if (lang === 'en') {
        document.documentElement.lang = 'en';
        updatePageText('en');
    } else if (lang === 'fil') {
        document.documentElement.lang = 'fil';
        updatePageText('fil');
    }
}

function updatePageText(lang) {
    const t = translations[lang];
    
    // Update toolbar and sidebar (with safety checks)
    const brandStrong = document.querySelector('.brand-text strong');
    if (brandStrong) brandStrong.innerText = t['research-assistant'];
    
    const brandSpan = document.querySelector('.brand-text span');
    if (brandSpan) brandSpan.innerText = t['made-easy'];
    
    // Update menu labels
    const menuLabels = document.querySelectorAll('.menu-label');
    if (menuLabels[0]) menuLabels[0].innerText = t['tools'];
    if (menuLabels[1]) menuLabels[1].innerText = t['language'];
    
    // Update nav buttons
    const navBtns = document.querySelectorAll('.nav-btn');
    const navTitles = [t['research-title'], t['significance'], t['problem-statement'], t['rrl-rrs'], t['citation']];
    const navSubs = [t['generate-titles'], t['why-matters'], t['define-problem'], t['literature-guide'], t['apa-7th']];
    
    navBtns.forEach((btn, idx) => {
        if (navTitles[idx]) {
            btn.querySelector('.nav-title').innerText = navTitles[idx];
            btn.querySelector('.nav-sub').innerText = navSubs[idx];
        }
    });
    
    // Update header (with safety checks)
    const eyebrow = document.querySelector('.eyebrow');
    if (eyebrow) eyebrow.innerText = t['research-made-easy'];
    
    const heading = document.querySelector('h1');
    if (heading) heading.innerText = t['interactive-skills'];
    
    const headerP = document.querySelector('.main-header p');
    if (headerP) headerP.innerText = t['step-by-step'];
    
    // Update all h2 headers in sections
    const sectionHeaders = {
        'title': t['research-title-gen'],
        'problem': t['problem-title'],
        'significance': t['significance-title'],
        'rrl': lang === 'fil' ? 'Pagsusuri ng Kaugnay na Panitala at Pag-aaral' : 'Review of Related Literature & Studies',
        'citation': t['citation-gen']
    };
    
    document.querySelectorAll('section h2').forEach(h2 => {
        const section = h2.closest('section');
        if (section) {
            const sectionId = section.id;
            if (sectionHeaders[sectionId]) {
                h2.innerText = sectionHeaders[sectionId];
            }
        }
    });
    
    // Update card sub descriptions
    const cardSubs = {
        'title': t['create-titles'],
        'problem': t['problem-desc'],
        'significance': t['sig-desc'],
        'rrl': lang === 'fil' ? 'Maghanap sa mga Maaasahang Website ng Pananaliksik.' : 'Search Reliable Research Websites.',
        'citation': t['format-source']
    };
    
    document.querySelectorAll('.card-sub').forEach(sub => {
        const section = sub.closest('section');
        if (section) {
            const sectionId = section.id;
            if (cardSubs[sectionId]) {
                sub.innerText = cardSubs[sectionId];
            }
        }
    });
    
    // Update all labels with smart text matching
    const labelTranslations = {
        'Study Topic:': t['study-topic'],
        'Target Group:': t['target-group'],
        'Variables (Optional):': t['variables-optional'],
        'Research Topic:': t['research-topic'],
        'Beneficiaries:': t['beneficiaries'],
        'Selected Beneficiaries:': t['beneficiaries'],
        'Enter Your Study Topic:': t['topic-label'],
        'Citation style': t['citation-style'],
        'Source type': t['source-type'],
        'Source details': t['source-details'],
        'Review of Related Literature & Studies': t['rrl-title'],
        'Search Reliable Research Websites.': t['rrl-desc'],
        'Statement of the Problem': t['problem-title'],
        'APA Citation Generator': t['citation-gen'],
        'Citation Generator': t['citation-gen'],
    };
    
    document.querySelectorAll('label').forEach(label => {
        const currentText = label.innerText.trim();
        if (labelTranslations[currentText]) {
            label.innerText = labelTranslations[currentText];
        }
    });
    
    // Update all input placeholders with smart text matching
    const placeholderTranslations = {
        'e.g., Effects of social media on academic performance': t['topic-placeholder'],
        'e.g., High school students': t['group-placeholder'],
        'e.g., Study habits, screen time, grades': t['variables-placeholder'],
        'e.g., Impact of online learning on student engagement': t['problem-topic-placeholder'],
        'e.g., Mobile learning applications': t['sig-topic-placeholder'],
        'Click chips above or type manually (comma-separated)': t['beneficiaries-placeholder'],
        'e.g., Effects of gamification on student motivation': t['rrl-placeholder'],
        'Paste or type: title, author, year, URL, journal, volume, pages... (Note: system requires valid URL for now)': t['source-placeholder'],
        'Paste or type: title, author, year, URL, journal, volume, pages…': t['source-placeholder']
    };
    
    document.querySelectorAll('input, textarea').forEach(input => {
        const currentPlaceholder = input.getAttribute('placeholder');
        if (currentPlaceholder && placeholderTranslations[currentPlaceholder]) {
            input.setAttribute('placeholder', placeholderTranslations[currentPlaceholder]);
        }
    });
    
    const buttonTranslations = {
        'Generate →': t['generate'],
        'Generate': t['generate'],
        'Use sample': t['use-sample'],
        'Search Now': t['search-now'],
        'Copy Citation': t['copy-citation'],
        'Kopyahin ang Pagsipi': t['copy-citation']
    };

    // Update all buttons
    document.querySelectorAll('button').forEach(btn => {
        const currentText = btn.innerText.trim();
        const icon = btn.querySelector('i[data-lucide]');
        
        if (buttonTranslations[currentText]) {
            if (icon) {
                const iconOuterHTML = icon.outerHTML;
                btn.innerHTML = `${iconOuterHTML} ${buttonTranslations[currentText]}`;
            } else {
                btn.innerText = buttonTranslations[currentText];
            }
        }
    });
    
    // Update select options
    const citationStyle = document.getElementById('citationStyle');
    if (citationStyle) {
        const styleOptionText = {
            apa: t['style-apa'],
            mla: t['style-mla'],
            chicago: t['style-chicago'],
            ieee: t['style-ieee']
        };

        Array.from(citationStyle.options).forEach(option => {
            if (styleOptionText[option.value]) {
                option.innerText = styleOptionText[option.value];
            }
        });
    }

    const citationSourceType = document.getElementById('citationSourceType');
    if (citationSourceType) {
        const sourceOptionText = {
            website: t['source-website'],
            journal: t['journal-article'],
            book: t['source-book']
        };

        Array.from(citationSourceType.options).forEach(option => {
            if (sourceOptionText[option.value]) {
                option.innerText = sourceOptionText[option.value];
            }
        });
    }
    
    // Update chips/beneficiary buttons
    const chipTranslations = {
        'Students': lang === 'fil' ? 'Mga estudyante' : 'Students',
        'Teachers': lang === 'fil' ? 'Mga guro' : 'Teachers',
        'Parents': lang === 'fil' ? 'Mga magulang' : 'Parents',
        'School Administrators': lang === 'fil' ? 'Mga administrator ng paaralan' : 'School Administrators',
        'Researchers': lang === 'fil' ? 'Mga mananaliksik' : 'Researchers',
        'Community': lang === 'fil' ? 'Komunidad' : 'Community'
    };
    
    const beneficiaryMap = {
        'Students': 'Students',
        'Mga estudyante': 'Students',
        'Teachers': 'Teachers',
        'Mga guro': 'Teachers',
        'Parents': 'Parents',
        'Mga magulang': 'Parents',
        'School Administrators': 'School Administrators',
        'Mga administrator ng paaralan': 'School Administrators',
        'Researchers': 'Researchers',
        'Mga mananaliksik': 'Researchers',
        'Community': 'Community',
        'Komunidad': 'Community'
    };
    
    document.querySelectorAll('.chip').forEach(chip => {
        const currentText = chip.innerText.trim();
        const englishBeneficiary = beneficiaryMap[currentText] || currentText;
        
        if (chipTranslations[englishBeneficiary]) {
            const newText = chipTranslations[englishBeneficiary];
            chip.innerText = newText;
            // Keep the original English value for the onclick function
            chip.onclick = () => addBeneficiary(englishBeneficiary);
        }
    });
    
    // Refresh icons
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initLanguageSwitching);
