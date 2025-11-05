import { supabase } from "@/integrations/supabase/client";

export const ensureImagesBucket = async () => {
  try {
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();

    if (listError) {
      console.error("Error listing buckets:", listError);
      return false;
    }

    const imagesBucketExists = buckets?.some((bucket) => bucket.name === "images");

    if (!imagesBucketExists) {
      const { data, error: createError } = await supabase.storage.createBucket("images", {
        public: true,
      });

      if (createError) {
        console.error("Error creating images bucket:", createError);
        return false;
      }

      console.log("Images bucket created successfully");
      return true;
    }

    console.log("Images bucket already exists");
    return true;
  } catch (error) {
    console.error("Storage setup error:", error);
    return false;
  }
};
