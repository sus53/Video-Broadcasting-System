import Watch from '../models/Watch.js'

export const GetWatch = async (req, res) => {
    const username = req.body.username;
    try {
        const watch = await Watch.findOne({ username });
        res.status(200).json(watch);
    } catch (error) {
        res.status(404).json({ "message": error.message })
    }
}

export const AddWatch = async (req, res) => {
    const watch = req.body;
    try {
        const data = await Watch.findOne({ username: watch.username });
        if (data) {
            await Watch.findOneAndUpdate({ username: watch.username }, { list: [...data.list, watch.list], username: watch.username });
        }
        else {
            const newWatch = new Watch({ list: watch.list, username: watch.username });
            await newWatch.save();
        }
        res.status(202).json(watch);
    } catch (error) {
        res.status(402).json({ "message": error.message })
    }
}

export const RemoveWatch = async (req, res) => {
    const watch = req.body;
    try {
        await Watch.findOneAndRemove(watch);
        res.status(202).json(true);
    } catch (error) {
        res.status(402).json({ "message": error.message })
    }
}