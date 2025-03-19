import Message from "../models/Message.js";

export async function sendMessage(req, res) {
  try {
    const { receiver, text } = req.body;
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const sender = req.user.id;
    const message = new Message({ sender, receiver, text });

    await message.save();
    res.status(201).json(message);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function getMessages(req, res) {
  try {
    const { userId } = req.params;
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: userId },
        { sender: userId, receiver: req.user.id },
      ],
    })
      .sort({ createdAt: 1 }) // Ascending order (oldest to newest)
      .lean(); // Optimize query performance

    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Server error" });
  }
}
