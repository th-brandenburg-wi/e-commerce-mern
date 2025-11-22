import contentModel from "../models/contentModel.js";

// Get content for a page
const getContent = async (req, res) => {
  try {
    const { page } = req.params;
    let content = await contentModel.findOne({ page });

    if (!content) {
      // If content doesn't exist, create a default one
      content = new contentModel({
        page,
        content: {
          title: `Default ${page} Title`,
          body: `Default ${page} body content.`,
        },
      });
      await content.save();
    }

    res.json({ success: true, data: content });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Update content for a page (Admin only)
const updateContent = async (req, res) => {
  try {
    const { page } = req.params;
    const { content } = req.body;

    let pageContent = await contentModel.findOne({ page });

    if (!pageContent) {
      pageContent = new contentModel({ page, content });
    } else {
      pageContent.content = content;
    }

    await pageContent.save();
    res.json({ success: true, message: "Content updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { getContent, updateContent };
