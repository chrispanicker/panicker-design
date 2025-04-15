import { groq } from "next-sanity";
import { client } from "./lib/client";

export async function getProjects() {
  return client.fetch(
    groq`*[_type == "project"]|order(orderRank){
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      layout,
      preview {
        assetType,
        "desktopUrl": select(
          desktopMedia.image.asset->url != null => desktopMedia.image.asset->url,
          desktopMedia.video.asset->url
        ),
        "mobileUrl": select(
          mobileMedia.image.asset->url != null => mobileMedia.image.asset->url,
          mobileMedia.video.asset->url
        )
      }
  }
      `
  );
}
