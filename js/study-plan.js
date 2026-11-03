/*
 * Independent study plan. The Monday scheduled task moves `currentWeek` forward by one
 * (1 = first entry in `entries`) and updates `currentWeekStart`. Entries are in the order of the
 * original plan document; "Month 4 Project" counts as its own week.
 */
const STUDY_PLAN = {
  currentWeek: 9,
  // Monday of the week that `currentWeek` refers to, as YYYY-MM-DD.
  currentWeekStart: "2026-11-02",
  meeting: "Weekly meeting on Wednesdays",
  log: "Student Accomplishment Log due Friday",
  entries: [
    {
        "label": "Week 1",
        "title": "Telescope/Camera Setup",
        "month": "Month 1: Foundation & Relearning Basic Skills",
        "tasks": [
            "Making sure everything is properly set up"
        ],
        "deliverable": ""
    },
    {
        "label": "Week 2",
        "title": "Stacking/Stretching Review",
        "month": "Month 1: Foundation & Relearning Basic Skills",
        "tasks": [
            "Getting the proper program installed on this computer",
            "Reviewing basic stacking and stretching processes"
        ],
        "deliverable": "Take unstacked photos (Downloaded is fine) and stack and stretch them to produce a basic astrophotography image (Upload both the final result and the original set of files)"
    },
    {
        "label": "Week 3",
        "title": "Lightroom Basic",
        "month": "Month 1: Foundation & Relearning Basic Skills",
        "tasks": [
            "Making Sure Lightroom is fully installed and set up on these computers",
            "Reviewing basic editing features like exposure"
        ],
        "deliverable": "Take your final result from the previous week and edit it to produce a clearer result."
    },
    {
        "label": "Week 4",
        "title": "Complete Basic Astrophotography Workflow",
        "month": "Month 1: Foundation & Relearning Basic Skills",
        "tasks": [
            "Review the complete workflow from capturing (Design Process Step 3) → organizing → stacking → stretching → Lightroom.",
            "Practice taking a small imaging session from beginning to end."
        ],
        "deliverable": "Complete one astrophotography image independently using the entire workflow."
    },
    {
        "label": "Week 5",
        "title": "Understanding the Night Sky",
        "month": "Month 2: Learning the Night Sky & Target Identification",
        "tasks": [
            "Learning how the night sky changes throughout the year",
            "Reviewing constellations, stars, planets, nebulae, galaxies, and star clusters",
            "Learning basic celestial coordinates and how astronomers locate objects"
        ],
        "deliverable": "Identify and document 10 visible night-sky objects and provide the name, type of object, and location in the sky."
    },
    {
        "label": "Week 6",
        "title": "Using Astronomy Software",
        "month": "Month 2: Learning the Night Sky & Target Identification",
        "tasks": [
            "Installing and setting up a planetarium/sky-mapping program",
            "Learning how to navigate the night sky using software",
            "Practicing finding objects and determining when they will be visible",
            "Learning how to plan an observing or photography session"
        ],
        "deliverable": "Choose 5 astrophotography targets and create a sky map showing where each target can be found."
    },
    {
        "label": "Week 7",
        "title": "Constellations & Star-Hopping",
        "month": "Month 2: Learning the Night Sky & Target Identification",
        "tasks": [
            "Learning major constellations commonly used for astrophotography",
            "Learning how to use bright stars to locate fainter objects",
            "Practicing star-hopping from one known star to a deep-sky object",
            "Learning how to recognize objects in both software and the actual night sky"
        ],
        "deliverable": "Choose 3 space objects and create a step-by-step guide showing how to find the general location of each one."
    },
    {
        "label": "Week 8",
        "title": "Planning an Astrophotography Night",
        "month": "Month 2: Learning the Night Sky & Target Identification",
        "tasks": [
            "Learning how to plan around moon phase, weather, darkness, and target visibility",
            "Choosing targets based on the available equipment",
            "Creating a complete plan for an actual photography night",
            "Reviewing what equipment and accessories will be needed before going outside"
        ],
        "deliverable": "Create a complete astrophotography session plan including target, date/time, location, moon conditions, and planned workflow. Also create a half- to full-page about satellite launches and how they might affect astrophotography."
    },
    {
        "label": "Week 9",
        "title": "Calibration Frames",
        "month": "Month 3: Advanced Stacking & Processing",
        "tasks": [
            "Learning what darks, flats, and bias frames are used for",
            "Learning how calibration frames improve the final image",
            "Practicing organizing and applying calibration frames"
        ],
        "deliverable": "Process the same image with and without calibration frames and compare the results."
    },
    {
        "label": "Week 10",
        "title": "Noise Reduction & Image Quality",
        "month": "Month 3: Advanced Stacking & Processing",
        "tasks": [
            "Learning what causes noise in astrophotography images",
            "Reviewing how stacking improves signal-to-noise ratio",
            "Learning basic noise reduction techniques"
        ],
        "deliverable": "Produce an image with reduced noise while maintaining as much detail as possible."
    },
    {
        "label": "Week 11",
        "title": "Colour Correction & White Balance",
        "month": "Month 3: Advanced Stacking & Processing",
        "tasks": [
            "Learning how to properly balance color in astrophotography",
            "Reviewing common colour problems and unwanted colour casts",
            "Practicing colour adjustments while maintaining natural-looking stars"
        ],
        "deliverable": "Produce a properly colour-balanced astrophotography image and submit a before-and-after comparison."
    },
    {
        "label": "Week 12",
        "title": "Advanced Stretching & Contrast",
        "month": "Month 3: Advanced Stacking & Processing",
        "tasks": [
            "Reviewing advanced stretching techniques",
            "Learning how to bring out faint details without destroying brighter areas",
            "Practicing curves, levels, contrast, and other adjustments"
        ],
        "deliverable": "Take a stacked image and produce a detailed final version using advanced stretching and contrast adjustments."
    },
    {
        "label": "Week 13",
        "title": "Nebula Photography",
        "month": "Month 4: Specialized Astrophotography",
        "tasks": [
            "Learning how to photograph emission, reflection, and dark nebulae",
            "Reviewing how filters can be used when photographing nebulae",
            "Practicing techniques for bringing out faint nebulosity and detail"
        ],
        "deliverable": "Produce a finished nebula image."
    },
    {
        "label": "Week 14",
        "title": "Galaxy Photography",
        "month": "Month 4: Specialized Astrophotography",
        "tasks": [
            "Learning how to photograph galaxies",
            "Reviewing how to capture faint galaxy details while maintaining the bright center",
            "Practicing background removal, contrast, and detail enhancement"
        ],
        "deliverable": "Produce a finished galaxy image with visible structure and detail."
    },
    {
        "label": "Week 15",
        "title": "Wide-Field & Star Field Photography",
        "month": "Month 4: Specialized Astrophotography",
        "tasks": [
            "Learning how to photograph large areas of the night sky",
            "Practicing wide-field compositions",
            "Reviewing how lenses and telescopes can create different perspectives"
        ],
        "deliverable": "Produce a finished wide-field astrophotography image."
    },
    {
        "label": "Week 16",
        "title": "Moon & Planetary Photography",
        "month": "Month 4: Specialized Astrophotography",
        "tasks": [
            "Learning the differences between deep-sky and planetary photography",
            "Practicing lunar photography and high-speed image capture",
            "Reviewing basic planetary stacking and processing"
        ],
        "deliverable": "Produce a finished Moon or planetary image."
    },
    {
        "label": "Month 4 Project",
        "title": "Astrophotography Portfolio",
        "month": "Month 4: Specialized Astrophotography",
        "tasks": [
            "Create a small portfolio demonstrating multiple types of astrophotography"
        ],
        "deliverable": "Submit 3 finished images showing different types of astrophotography, along with the original files and a short explanation of how each image was created (100-ish words per image)"
    },
    {
        "label": "Week 17",
        "title": "Planning the Final Project",
        "month": "Month 5: Independent Astrophotography & Final Project",
        "tasks": [
            "Choosing a final astrophotography target",
            "Researching when and where the target will be visible",
            "Planning composition, exposure time, camera settings, and calibration frames"
        ],
        "deliverable": "Submit a complete plan for the final astrophotography project."
    },
    {
        "label": "Week 18",
        "title": "Capturing the Final Data",
        "month": "Month 5: Independent Astrophotography & Final Project",
        "tasks": [
            "Setting up the equipment independently",
            "Following the imaging plan created during Week 17",
            "Capturing light frames and calibration frames",
            "Keeping track of equipment settings and imaging conditions"
        ],
        "deliverable": "Submit the complete original dataset and an imaging log."
    },
    {
        "label": "Week 19",
        "title": "Processing the Final Image",
        "month": "Month 5: Independent Astrophotography & Final Project",
        "tasks": [
            "Processing the final dataset from start to finish",
            "Stacking and calibrating the images",
            "Stretching, colour correcting, reducing noise, and enhancing detail",
            "Using Lightroom for final adjustments"
        ],
        "deliverable": "Submit the first completed version of the final image along with the processing files."
    },
    {
        "label": "Week 20",
        "title": "Portfolio",
        "month": "Month 5: Independent Astrophotography & Final Project",
        "tasks": [],
        "deliverable": "A portfolio of all my projects I’ve made throughout the year."
    }
],
};

(function () {
  "use strict";
  const root = document.getElementById("study-plan");
  if (!root) return;
  const P = STUDY_PLAN;
  const i = P.currentWeek - 1;

  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }

  function addDays(iso, d) {
    const t = new Date(iso + "T12:00:00");
    t.setDate(t.getDate() + d);
    return t;
  }
  const fmt = (d) => d.toLocaleDateString("en-CA", { month: "short", day: "numeric" });
  const weekRange = (offset) => {
    const s = addDays(P.currentWeekStart, offset * 7);
    return fmt(s) + " – " + fmt(addDays(P.currentWeekStart, offset * 7 + 4));
  };

  function weekBlock(e, offset) {
    const b = el("div", "sp-week");
    const h = el("h4", "doc-h");
    h.append(e.label + ": " + e.title);
    h.append(el("span", "sp-dates", weekRange(offset)));
    b.append(h);
    if (e.tasks.length) {
      const ul = el("ul");
      e.tasks.forEach((t) => ul.append(el("li", "", t)));
      b.append(ul);
    }
    if (e.deliverable) {
      const p = el("p");
      p.append(el("strong", "", "Deliverable: "), e.deliverable);
      b.append(p);
    }
    return b;
  }

  function dropdown(badge, title, meta, blocks, open) {
    const d = el("details", "milestone");
    if (open) d.open = true;
    const s = el("summary");
    s.append(el("span", "badge", badge), el("h2", "", title));
    if (meta) s.append(el("span", "due", meta));
    d.append(s);
    const body = el("div", "sp-body");
    blocks.forEach((x) => body.append(x));
    if (!blocks.length) body.append(el("p", "", "Nothing here yet."));
    d.append(body);
    return d;
  }

  const past = [];
  for (let k = 0; k < i && k < P.entries.length; k++) past.push(weekBlock(P.entries[k], k - i));
  const cur = P.entries[i] ? [weekBlock(P.entries[i], 0)] : [];
  const next = P.entries[i + 1] ? [weekBlock(P.entries[i + 1], 1)] : [];

  const footer = el("p", "sp-foot", P.meeting + " · " + P.log);

  root.append(
    dropdown("Last weeks", "Past weeks", past.length + (past.length === 1 ? " week" : " weeks"), past, false),
    dropdown("This week", P.entries[i] ? P.entries[i].label + ": " + P.entries[i].title : "Current week", weekRange(0), cur, true),
    dropdown("Next week", P.entries[i + 1] ? P.entries[i + 1].label + ": " + P.entries[i + 1].title : "Next week", weekRange(1), next, false),
    footer
  );
})();
