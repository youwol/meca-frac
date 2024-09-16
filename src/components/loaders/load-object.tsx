import { IOFactory } from "@youwol/io";
import { DataFrame } from "@youwol/dataframe";

enum ObjectType {
  POINT = "Point",
  LINE = "Line",
  SURFACE = "Surface",
  VOLUME = "Volume",
}

const objectTypeMap = new Map<string, ObjectType>();
objectTypeMap.set("vs", ObjectType.POINT);
objectTypeMap.set("xyz", ObjectType.POINT);
objectTypeMap.set("pl", ObjectType.LINE);
objectTypeMap.set("ts", ObjectType.SURFACE);
objectTypeMap.set("so", ObjectType.VOLUME);

export function loadObject(file: string, buffer: string): Promise<DataFrame[]> {
  return new Promise((resolve, reject) => {
    const filter = IOFactory.getFilter(file);
    if (!filter) {
      reject(new Error("No filter found for the given file type."));
      return;
    }

    try {
      const dfs = filter.decode(buffer, {
        shared: false,
        merge: true,
        repair: true,
      });
      resolve(dfs as DataFrame[]);
    } catch (error) {
      reject(error);
    }
  });
}
