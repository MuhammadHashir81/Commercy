export const sellerUpload = async (req, res) => {
    try {
        // Form fields come from req.body
        console.log("Form Data: ", req.body); // name, category, price, etc.
        res.json({success:req.body})

        // Uploaded file comes from req.file (not req.files)
        console.log("Uploaded File: ", req.file);

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // You can save req.body + req.file.path in MongoDB here if needed

        res.status(200).json({
            success: "Your product is uploaded successfully",
            filePath: `/uploads/${req.file.filename}`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
