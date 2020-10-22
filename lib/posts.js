import fs from 'fs'
import path from 'path'
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), 'posts');

export default function getSortedPostsData() {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map(filename => {
        const id = filename.replace(/\.md$/, '');

        const fullPath = path.join(postsDirectory, filename);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const matterResult = matter(fileContents);

        return {
            id,
            ...matterResult.data
        }
    });

    //Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}