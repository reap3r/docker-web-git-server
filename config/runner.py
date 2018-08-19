import os
import subprocess

def main():
    os.system("rm -rf admin/")
    os.system("git clone http://localhost:4443/admin")

    files = [f for f in os.listdir("admin/") if os.path.isfile(os.path.join("admin/", f))]

    index = open("/public/index.html", "w")
    index.write("Output of scripts in admin repo:</br></br>")

    index.write("Script files:")
    for f in files:
        if ".sh" in f:
            index.write("</br><p>"+f+":</br>")
            output = subprocess.check_output(['sh',"admin/"+f]).replace("\n", "</br>")
            index.write(output+"</br></p>")
    index.close()


if __name__ == "__main__":
    main()
