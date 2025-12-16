import { FORM_SECTIONS } from "../../constant";

export default function useResumeSection({
    userData,
    isAllRequiredFilled,
    getAns,
    onDragStart,
    onDragOver,
    onDrop,
    onDragEnd,
    getSectionContainerStyle
}) {

    // ---------------------- SKILLS -----------------------
    const renderSkills = () => {
        // Custom function to check if all required fields are filled 
        if (!isAllRequiredFilled(userData.skills)) return null;

        // Replace this with array of skills
        const ORDER = ["languages", "frameworks", "database", "others"];

        return (
            <section
                key={FORM_SECTIONS.SKILLS}
                draggable
                onDragStart={(e) => onDragStart(e, FORM_SECTIONS.SKILLS)}
                onDragOver={(e) => onDragOver(e, FORM_SECTIONS.SKILLS)}
                onDrop={(e) => onDrop(e, FORM_SECTIONS.SKILLS)}
                onDragEnd={onDragEnd}
                style={{ ...getSectionContainerStyle(FORM_SECTIONS.SKILLS), marginTop: "1px" }}
            >
                <h2
                    style={{ fontSize: "18px", fontWeight: "bold", textTransform: "uppercase", paddingBottom: "4px", marginBottom: "0px", lineHeight: "1.2", display: "inline-block" }}
                >
                    Skills
                </h2>

                <div style={{
                    height: "1px",
                    width: "100%",
                    backgroundColor: "black",
                    marginTop: "6px"
                }} />

                {ORDER.map((key) => {
                    const arr = userData.skills[key];
                    if (!isAllRequiredFilled(arr)) return null;

                    return (
                        <div key={key} style={{ marginTop: "-2px" }}>
                            <p style={{ margin: 0, fontSize: "14px" }}>
                                <span style={{ fontWeight: "bold" }}>
                                    {arr[0].displayQuestion}:
                                </span>{" "}
                                {arr.map((q) => q.answer).filter(Boolean).join(", ")}
                            </p>
                        </div>
                    );
                })}
            </section>
        );
    };

    // ---------------------- EDUCATION -----------------------
    const renderEducation = () => {
        if (!isAllRequiredFilled(userData.education)) return null;

        const eduKeys = ["Degree", "higherSchool", "school"];

        const renderEduBlock = (key) => {
            const data = userData.education[key];
            if (!isAllRequiredFilled(data)) return null;

            const cgpa = getAns(data, "Degree CGPA/Percentage") || getAns(data, "12th CGPA/Percentage") || getAns(data, "10th CGPA/Percentage");
            const institute = getAns(data, "College Name") || getAns(data, "Junior College Name") || getAns(data, "School Name");
            const degreeType = getAns(data, "Degree Type");
            const branch = getAns(data, "Branch");
            const board = getAns(data, "Type Of Board");
            const stream = getAns(data, "Type Of Stream");
            const start = getAns(data, "Start Date");
            const end = getAns(data, "End Date");
            const eduType = getAns(data, "Education Type");

            return (
                <div
                    key={key}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "0px",
                    }}
                >
                    <div style={{ maxWidth: "75%" }}>
                        <p style={{ fontWeight: "bold", margin: 0, fontSize: "13px" }}>
                            {institute}
                        </p>

                        <p style={{ margin: "2px 0 0 0", fontSize: "12px" }}>
                            {/* DEGREE */}
                            {degreeType && degreeType}
                            {branch && ` — ${branch}`}

                            {/* HIGHER SCHOOL (12th / Diploma) */}
                            {eduType && !degreeType && eduType}
                            {stream && !degreeType && ` — ${stream}`}

                            {/* SCHOOL (10th) */}
                            {!degreeType && !eduType && board && board}

                            {/* CGPA */}
                            {cgpa && (
                                <>
                                    {" — "}
                                    <span style={{ fontWeight: "bold" }}>{cgpa} CGPA</span>
                                </>
                            )}
                        </p>

                    </div>

                    <div style={{ textAlign: "right" }}>
                        <p style={{ margin: 0 }}>
                            {start} – {end}
                        </p>
                    </div>
                </div>
            );
        };

        return (
            <section
                key={FORM_SECTIONS.EDUCATION}
                draggable
                onDragStart={(e) => onDragStart(e, FORM_SECTIONS.EDUCATION)}
                onDragOver={(e) => onDragOver(e, FORM_SECTIONS.EDUCATION)}
                onDrop={(e) => onDrop(e, FORM_SECTIONS.EDUCATION)}
                onDragEnd={onDragEnd}
                style={getSectionContainerStyle(FORM_SECTIONS.EDUCATION)}
            >
                <h2
                    style={{ fontSize: "18px", fontWeight: "bold", textTransform: "uppercase", paddingBottom: "4px", marginBottom: "0px", lineHeight: "1.2", display: "inline-block" }}
                >
                    Education
                </h2>

                <div style={{
                    height: "1px",
                    width: "100%",
                    backgroundColor: "black",
                    marginTop: "6px"
                }} />

                {eduKeys.map(renderEduBlock)}
            </section>
        );
    };

    // ---------------------- PROJECTS -----------------------
    const renderProjects = () => {
        if (!isAllRequiredFilled(userData.projects)) return null;

        const projectKeys = ["project1", "project2", "project3"];

        return (
            <section
                key={FORM_SECTIONS.PROJECT}
                draggable
                onDragStart={(e) => onDragStart(e, FORM_SECTIONS.PROJECT)}
                onDragOver={(e) => onDragOver(e, FORM_SECTIONS.PROJECT)}
                onDrop={(e) => onDrop(e, FORM_SECTIONS.PROJECT)}
                onDragEnd={onDragEnd}
                style={{ ...getSectionContainerStyle(FORM_SECTIONS.PROJECT), marginTop: "9px" }}
            >
                <h2
                    style={{ fontSize: "18px", fontWeight: "bold", textTransform: "uppercase", paddingBottom: "4px", marginBottom: "0px", lineHeight: "1.2", display: "inline-block" }}
                >
                    Projects
                </h2>

                <div style={{
                    height: "1px",
                    width: "100%",
                    backgroundColor: "black",
                    marginTop: "6px"
                }} />

                {projectKeys.map((key, index) => {
                    const projectData = userData.projects[key];
                    if (!isAllRequiredFilled(projectData)) return null;

                    const name = getAns(projectData, "Project Name");
                    const description = getAns(projectData, "Project Description");
                    const techStack = getAns(projectData, "Tech Stack");
                    const liveLink = getAns(projectData, "Live Link");

                    return (
                        <div key={key} style={{ marginTop: index === 0 ? "0px" : "0px" }}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: "2px",
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: "15px",
                                        fontWeight: 600,
                                    }}
                                >
                                    {name}
                                </span>

                                {liveLink && (
                                    <a
                                        href={liveLink}
                                        style={{
                                            fontSize: "12px",
                                            textDecoration: "none",
                                            color: "rgb(29,78,216)",
                                        }}
                                    >
                                        Link to Demo
                                    </a>
                                )}
                            </div>

                            <p
                                style={{ margin: "0", fontSize: "14px", lineHeight: "19px" }}
                                dangerouslySetInnerHTML={{ __html: description }}
                            />

                            <p style={{ margin: "2px 0 0 0", fontSize: "15px", fontWeight: "bold" }}>
                                <span style={{ fontWeight: "bold" }}>Tech Stack: </span>
                                {techStack}
                            </p>
                        </div>
                    );
                })}
            </section>
        );
    };

    // ---------------------- CERTIFICATIONS -----------------------
    const renderCertifications = () => {
        if (!isAllRequiredFilled(userData.certifications)) return null;

        const normalizeCertifications = (raw) => {
            let result = [];

            if (Array.isArray(raw)) {
                if (raw.length && (raw[0].title || raw[0].platform || raw[0].link || raw[0].desc)) {
                    return raw.map((c) => ({
                        title: c.title || "",
                        desc: (c.platform ? `${c.platform} | ` : "") + (c.desc || ""),
                        link: c.link || "",
                    }));
                }

                const nameItem = raw.find((i) => i.displayQuestion?.toLowerCase().includes("name"));
                const linkItem = raw.find((i) => i.displayQuestion?.toLowerCase().includes("verify"));
                const descItem = raw.find((i) => i.displayQuestion?.toLowerCase().includes("description"));

                if (nameItem?.answer?.trim()) {
                    result.push({
                        title: nameItem.answer,
                        desc: descItem?.answer || "",
                        link: linkItem?.answer || "",
                    });
                }

                return result;
            }

            if (raw && typeof raw === "object") {
                Object.values(raw).forEach((child) => {
                    result = result.concat(normalizeCertifications(child));
                });
            }

            return result;
        };

        const certs = normalizeCertifications(userData.certifications);
        if (!certs.length) return null;

        return (
            <section
                key={FORM_SECTIONS.CERTIFICATIONS}
                draggable
                onDragStart={(e) => onDragStart(e, FORM_SECTIONS.CERTIFICATIONS)}
                onDragOver={(e) => onDragOver(e, FORM_SECTIONS.CERTIFICATIONS)}
                onDrop={(e) => onDrop(e, FORM_SECTIONS.CERTIFICATIONS)}
                onDragEnd={onDragEnd}
                style={{ ...getSectionContainerStyle(FORM_SECTIONS.CERTIFICATIONS), marginTop: "9px" }}
            >
                <h2
                    style={{ fontSize: "18px", fontWeight: "bold", textTransform: "uppercase", paddingBottom: "4px", marginBottom: "0px", lineHeight: "1.2", display: "inline-block" }}
                >
                    Certifications
                </h2>

                <div style={{
                    height: "1px",
                    width: "100%",
                    backgroundColor: "black",
                    marginTop: "6px"
                }} />

                {certs.map((cert, index) => (
                    <div key={index} style={{ marginTop: index === 0 ? "0px" : "0px" }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <span style={{ fontWeight: 600, fontSize: "13px" }}>
                                {cert.title}
                            </span>

                            {cert.link && (
                                <a
                                    href={cert.link}
                                    style={{
                                        fontSize: "12px",
                                        textDecoration: "underline",
                                        color: "rgb(29,78,216)",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    verify link
                                </a>
                            )}
                        </div>

                        {cert.desc && (
                            <p
                                style={{ marginTop: "2px", fontSize: "14px" }}
                                dangerouslySetInnerHTML={{ __html: cert.desc }}
                            />
                        )}
                    </div>
                ))}
            </section>
        );
    };

    return {
        renderSkills,
        renderEducation,
        renderProjects,
        renderCertifications
    };
}
