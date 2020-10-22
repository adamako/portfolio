import fs from 'fs'
import path from 'path'
import matter from "gray-matter"
import remark from "remark"
import html from "remark-html"

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

export function getAllPostIds() {
    const  fileNames= fs.readdirSync(postsDirectory)

    return fileNames.map(fileName=>{
        return {
            params:{
                id:fileName.replace(/\.md$/,'')
            }
        }
    })
}

export async function getPostData(id) {
    const fullPath=path.join(postsDirectory, `${id}.md`)
    const fileContents= fs.readFileSync(fullPath, 'utf8')

    const matterResult= matter(fileContents)


    const processedContent= await remark().use(html).process(matterResult.content)
    const contentHtml= processedContent.toString()



    return {
        id,
        contentHtml,
        ...matterResult.data
    }
}